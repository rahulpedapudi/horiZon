import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { sendChatMessage, clearChatSession } from "../services/agentApi";
import {
  getChats,
  createChat,
  addMessageToChat,
  deleteChat,
} from "../services/chatService";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  // State for conversations
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);

  const [settings, setSettings] = useState({
    showTimestamps: true,
    density: "comfortable",
  });

  // Load chats on mount/user change
  useEffect(() => {
    if (user) {
      loadChats();
    } else {
      setConversations([]);
      setIsLoadingChats(false);
    }
  }, [user]);

  const loadChats = async () => {
    setIsLoadingChats(true);
    try {
      const chats = await getChats();
      // Map _id to id for frontend compatibility
      const mappedChats = chats.map((c) => ({ ...c, id: c._id }));
      setConversations(mappedChats);
    } catch (err) {
      console.error("Failed to load chats:", err);
    } finally {
      setIsLoadingChats(false);
    }
  };

  // Create a new conversation
  const createConversation = useCallback(async (title = "New Chat") => {
    try {
      // Optimistic Update can be tricky for ID, so we wait for server
      const newChat = await createChat(title);
      const formattedChat = { ...newChat, id: newChat._id };

      setConversations((prev) => [formattedChat, ...prev]);
      setActiveChatId(formattedChat.id);
      return formattedChat;
    } catch (err) {
      console.error("Failed to create chat:", err);
      setError("Could not create new chat");
      return null;
    }
  }, []);

  // Send message to agent
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || !user) return;

      let chatId = activeChatId;
      let currentConv = conversations.find((c) => c.id === chatId);

      // If no active chat, create one
      if (!currentConv) {
        const newConv = await createConversation(
          text.slice(0, 30) + (text.length > 30 ? "..." : "")
        );
        if (!newConv) return; // Error handled in createConversation
        chatId = newConv.id;
        currentConv = newConv;
      }

      // 1. Optimistic UI Update (User Message)
      const tempUserMsg = {
        id: Date.now(), // Temp ID
        role: "user",
        text,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, tempUserMsg] } : c
        )
      );

      setIsTyping(true);
      setError(null);

      try {
        // 2. Persist User Message to Backend
        // We don't await this strictly before showing UI, but we need it for consistency if we refreshed
        // For simplicity/robustness, we fire and forget the save OR wait. Waiting ensures order.
        await addMessageToChat(chatId, { role: "user", text });

        // 3. Call Agent API
        const response = await sendChatMessage(
          user.id || "anonymous",
          text,
          currentConv.sessionId
        );

        // 4. Persist Agent Response to Backend
        const agentMsgPayload = {
          role: "assistant",
          text: response.response,
          suggestions: response.suggestions || [],
          timestamp: new Date(),
        };

        const updatedChat = await addMessageToChat(chatId, agentMsgPayload);

        // 5. Update State with Server Version (which has true IDs)
        setConversations((prev) =>
          prev.map((c) =>
            c.id === chatId ? { ...c, messages: updatedChat.messages } : c
          )
        );
      } catch (err) {
        console.error("Chat error:", err);
        setError(err.message);

        // Add error message to chat
        const errorMsg = {
          id: Date.now() + 2,
          role: "system",
          text: "Sorry, I'm having trouble connecting to the agent right now. Please try again.",
          isError: true,
          timestamp: new Date(),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, errorMsg] } : c
          )
        );
      } finally {
        setIsTyping(false);
      }
    },
    [activeChatId, conversations, user, createConversation]
  );

  // Clear chat session (Backend delete or clear messages? User guide says delete session)
  // For persistent history, "clearing session" might just mean clearing memory of agent, but keeping history?
  // Or deleting the chat? The UI has a trash can which usually means delete.
  const removeConversation = useCallback(
    async (id) => {
      try {
        await deleteChat(id);
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeChatId === id) setActiveChatId(null);
      } catch (err) {
        console.error("Failed to delete chat:", err);
      }
    },
    [activeChatId]
  );

  const clearSession = useCallback(
    async (chatId) => {
      // This was mapped to the trash icon in Sidebar, so it's effectively "Delete Chat"
      removeConversation(chatId);
    },
    [removeConversation]
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeChatId,
        setActiveChatId,
        isTyping,
        isLoadingChats,
        error,
        settings,
        setSettings,
        sendMessage,
        createConversation,
        removeConversation,
        clearSession,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

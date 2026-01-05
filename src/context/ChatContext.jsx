import React, { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { sendChatMessage, clearChatSession } from "../services/agentApi";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  // State for conversations
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState({
    showTimestamps: true,
    density: "comfortable",
  });

  // Create a new conversation
  const createConversation = useCallback((title = "New Chat") => {
    const newConv = {
      id: Date.now().toString(),
      title,
      timestamp: new Date(),
      messages: [],
      sessionId: `session_${Date.now()}`, // Unique session ID for the agent
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveChatId(newConv.id);
    return newConv;
  }, []);

  // Send message to agent
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || !user) return;

      let chatId = activeChatId;
      let currentConv = conversations.find((c) => c.id === chatId);

      // If no active chat, create one
      if (!currentConv) {
        currentConv = createConversation(
          text.slice(0, 30) + (text.length > 30 ? "..." : "")
        );
        chatId = currentConv.id;
      }

      // Add user message immediately
      const userMsg = {
        id: Date.now(),
        role: "user",
        text,
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, userMsg] } : c
        )
      );

      setIsTyping(true);
      setError(null);

      try {
        // Call Agent API
        const response = await sendChatMessage(
          user.id || "anonymous",
          text,
          currentConv.sessionId
        );

        // Add agent response
        const agentMsg = {
          id: Date.now() + 1,
          role: "assistant",
          text: response.response,
          suggestions: response.suggestions || [],
          timestamp: new Date(),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, agentMsg] } : c
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

  // Clear chat session
  const clearSession = useCallback(
    async (chatId) => {
      const chat = conversations.find((c) => c.id === chatId);
      if (!chat) return;

      try {
        if (chat.sessionId) {
          await clearChatSession(chat.sessionId);
        }

        setConversations((prev) =>
          prev.map((c) => (c.id === chatId ? { ...c, messages: [] } : c))
        );
      } catch (err) {
        console.error("Failed to clear session:", err);
      }
    },
    [conversations]
  );

  const removeConversation = useCallback(
    (id) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeChatId === id) setActiveChatId(null);
    },
    [activeChatId]
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeChatId,
        setActiveChatId,
        isTyping,
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

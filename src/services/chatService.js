const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Fetch all chats
 */
export const getChats = async () => {
  const response = await fetch(`${API_URL}/api/chats`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token auth
    },
    credentials: "include", // If using cookie auth
  });
  if (!response.ok) throw new Error("Failed to fetch chats");
  return response.json();
};

/**
 * Create new chat
 */
export const createChat = async (title, initialMessage) => {
  const response = await fetch(`${API_URL}/api/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({
      title,
      sessionId: `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      initialMessage,
    }),
  });
  if (!response.ok) throw new Error("Failed to create chat");
  return response.json();
};

/**
 * Add message to chat
 */
export const addMessageToChat = async (chatId, message) => {
  const response = await fetch(`${API_URL}/api/chats/${chatId}/message`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error("Failed to save message");
  return response.json();
};

/**
 * Delete chat
 */
export const deleteChat = async (chatId) => {
  const response = await fetch(`${API_URL}/api/chats/${chatId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete chat");
  return response.json();
};

export default {
  getChats,
  createChat,
  addMessageToChat,
  deleteChat,
};

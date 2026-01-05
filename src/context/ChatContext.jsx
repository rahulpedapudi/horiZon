import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Future Prediction Tools', timestamp: new Date(Date.now() - 3600000), pinned: false },
    { id: 2, title: 'Agent Hub for Learning', timestamp: new Date(Date.now() - 86400000), pinned: true },
    { id: 3, title: 'Course Selection for NPTEL', timestamp: new Date(Date.now() - 172800000), pinned: false },
  ]); // Mock data

  const [activeChatId, setActiveChatId] = useState(null);

  const [settings, setSettings] = useState({
    showTimestamps: true,
    density: 'comfortable', // 'compact' | 'comfortable'
  });

  const addConversation = (title) => {
    const newConv = {
      id: Date.now(),
      title: title || 'New Chat',
      timestamp: new Date(),
      pinned: false,
      messages: []
    };
    setConversations([newConv, ...conversations]);
    setActiveChatId(newConv.id);
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter(c => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const togglePin = (id) => {
    setConversations(conversations.map(c => 
      c.id === id ? { ...c, pinned: !c.pinned } : c
    ));
  };

  const toggleArchive = (id) => {
     // For now just console log, or filter out
     console.log('Archiving', id);
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      activeChatId,
      setActiveChatId,
      settings,
      setSettings,
      addConversation,
      deleteConversation,
      togglePin,
      toggleArchive
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  StopCircle,
  ArrowUp,
  Plus,
  Trash2,
} from "lucide-react";
import { useChat } from "../context/ChatContext";

const ChatInterface = () => {
  const {
    activeChatId,
    conversations,
    settings,
    sendMessage,
    isTyping,
    createConversation,
    clearSession,
    removeConversation,
  } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Get active conversation
  const activeConv = conversations.find((c) => c.id === activeChatId);
  const messages = activeConv?.messages || [];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm md:text-base">
            {activeConv?.title || "New Chat"}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => createConversation()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"
            title="New Chat">
            <Plus size={18} />
          </button>
          {activeConv && (
            <button
              onClick={() => {
                if (confirm("Clear this chat session?"))
                  clearSession(activeChatId);
              }}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-500 hover:text-red-500"
              title="Clear History">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Area - Scroll Container Full Width */}
      <div className="flex-1 w-full overflow-y-auto scroll-smooth">
        {/* Inner Content Centered */}
        <div
          className={`max-w-4xl mx-auto px-4 py-6 md:p-8 space-y-6 ${
            settings.density === "compact" ? "space-y-4" : "space-y-8"
          }`}>
          {/* Empty State / Welcome */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50 py-20">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Sparkles size={32} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                How can I help you today?
              </h2>
              <p className="max-w-md text-sm">
                Ask me about your career roadmap, skill gaps, or emerging trends
                in your field.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`group flex gap-4 md:gap-6 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}>
              {/* Avatar */}
              <div className="flex-shrink-0 mt-1">
                {msg.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Bot size={18} />
                  </div>
                ) : msg.isError ? (
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <Bot size={18} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                    <User size={18} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 max-w-[85%] ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}>
                <div className="space-y-2">
                  {/* Name & Time */}
                  <div
                    className={`flex items-center gap-2 text-xs text-gray-400 mb-1 ${
                      msg.role === "user" ? "justify-end" : ""
                    }`}>
                    <span className="font-semibold text-gray-600 dark:text-gray-300">
                      {msg.role === "assistant"
                        ? "Assistant"
                        : msg.isError
                        ? "System"
                        : "You"}
                    </span>
                    {settings.showTimestamps && (
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`
                      inline-block rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap
                      ${
                        msg.role === "user"
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-sm text-left"
                          : msg.isError
                          ? "bg-red-50 border border-red-100 text-red-600"
                          : "bg-transparent text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-800"
                      }
                   `}>
                    {msg.text}
                  </div>

                  {/* Suggestions (only for assistant messages) */}
                  {msg.role === "assistant" &&
                    msg.suggestions &&
                    msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full transition-colors border border-blue-100 dark:border-blue-800">
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 md:gap-6">
              <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 mt-1">
                <Bot size={18} />
              </div>
              <div className="flex items-center gap-1.5 p-4 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-0"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Full Width Wrapper with Centered Content */}
      <div className="w-full p-4 md:p-6 bg-transparent">
        <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm transition-all relative flex items-end p-2 gap-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message FutureHub..."
            rows={1}
            className="w-full pl-4 py-3 bg-transparent border-none focus:ring-0 resize-none max-h-48 text-gray-800 dark:text-gray-200 placeholder-gray-500"
            style={{ minHeight: "48px", maxHeight: "200px" }}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`p-2 mb-1.5 rounded-full transition-all duration-200 shrink-0 ${
              input.trim()
                ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}>
            {isTyping ? <StopCircle size={20} /> : <ArrowUp size={20} />}
          </button>
        </div>
        <div className="text-center mt-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            FutureHub can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

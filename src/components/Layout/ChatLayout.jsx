import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import ChatSidebar from "./ChatSidebar";
import SettingsModal from "../SettingsModal";

const ChatLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      <ChatSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 flex flex-col relative w-full transition-all duration-300 ${
          isCollapsed ? "md:pl-[80px]" : "md:pl-[260px]"
        }`}>
        {/* Mobile Header Trigger */}
        <div className="md:hidden sticky top-0 z-30 flex items-center p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <Menu size={24} />
          </button>
          <span className="ml-3 font-semibold">FutureHub</span>
        </div>

        <div className="flex-1 overflow-y-auto relative">
          <Outlet />
        </div>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default ChatLayout;

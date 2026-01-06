import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Plus,
  Search,
  Settings as SettingsIcon,
  MoreHorizontal,
  Pin,
  Archive,
  Trash2,
  Edit2,
  LayoutGrid,
  BookOpen,
  Map,
  MessageSquare,
  LogOut,
  User,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  TrendingUp,
  HelpCircle,
  Clock,
  Bookmark
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useInterest } from '../../context/InterestContext';

const ChatSidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed, onOpenSettings }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversations, activeChatId, setActiveChatId, addConversation, deleteConversation, togglePin } = useChat();
  const { user, logout } = useAuth();
  const { interests, currentInterest, setCurrentInterest } = useInterest();
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [isRoadmapsOpen, setIsRoadmapsOpen] = useState(false);

  // Map for accent colors to ensure Tailwind includes them
  const accentColorMap = {
    cyan: 'bg-cyan-500',
    pink: 'bg-pink-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    violet: 'bg-violet-500'
  };

  const textAccentColorMap = {
    cyan: 'text-cyan-600 dark:text-cyan-400',
    pink: 'text-pink-600 dark:text-pink-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    orange: 'text-orange-600 dark:text-orange-400',
    violet: 'text-violet-600 dark:text-violet-400'
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredChatId, setHoveredChatId] = useState(null);
  const [menuChatId, setMenuChatId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Refs for click outside detection
  const profileMenuRef = useRef(null);
  const chatMenuRef = useRef(null);

  // Group conversations
  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const pinnedChats = filteredConversations.filter(c => c.pinned);
  const recentChats = filteredConversations.filter(c => !c.pinned);

  // Global click listener to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Profile Menu
      if (isProfileOpen && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }

      // Close Chat Item Menu
      // Note: For chat menu, we need to be careful not to close it when clicking the triggering button
      // But the trigger button logic sets state. We can just check if click is outside any menu container.
      // However, since we have multiple chat items, we can't easily ref them all individually at top level without map.
      // Simplified approach: If we click anywhere that is NOT inside the currently open menu, close it.
      // We'll rely on stopping propagation on the menu content itself, and detecting document clicks to close.
    };

    if (isProfileOpen || menuChatId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen, menuChatId]);

  // Special listener just for the chat menu since it's dynamic
  useEffect(() => {
    const closeChatMenu = (e) => {
      if (menuChatId && !e.target.closest('.chat-menu-container') && !e.target.closest('.chat-menu-trigger')) {
        setMenuChatId(null);
      }
    };

    if (menuChatId) {
      document.addEventListener('mousedown', closeChatMenu);
    }
    return () => document.removeEventListener('mousedown', closeChatMenu);
  }, [menuChatId]);


  const handleNewChat = () => {
    addConversation('New Chat');
    navigate('/chat');
    setIsMobileOpen(false);
  };

  const handleExpand = () => {
    if (isCollapsed) setIsCollapsed(false);
  };

  const NavItem = ({ to, icon: Icon, label, active }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg transition-colors group relative
        ${active
          ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
      `}
    >
      <Icon size={18} className="shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );

  const ConversationItem = ({ chat }) => (
    <div
      className={`group relative flex items-center px-2 py-2 mx-2 rounded-lg cursor-pointer transition-colors
        ${activeChatId === chat.id
          ? 'bg-gray-200 dark:bg-gray-800'
          : 'hover:bg-gray-200 dark:hover:bg-gray-800/50'}
      `}
      onClick={() => { setActiveChatId(chat.id); setIsMobileOpen(false); navigate('/chat'); }}
      onMouseEnter={() => setHoveredChatId(chat.id)}
      onMouseLeave={() => setHoveredChatId(null)}
    >
      <MessageSquare size={18} className="text-gray-500 dark:text-gray-400 shrink-0 ml-1" />

      <div className="flex-1 min-w-0 ml-3 pr-6">
        <h4 className={`text-sm font-normal truncate ${activeChatId === chat.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {chat.title}
        </h4>
      </div>

      {/* Hover Menu Trigger */}
      {(hoveredChatId === chat.id || menuChatId === chat.id) && (
        <div className="absolute right-2 flex items-center bg-transparent">
          {chat.pinned && <Pin size={12} className="mr-2 text-gray-400" />}
          <button
            className="chat-menu-trigger p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-500"
            onClick={(e) => { e.stopPropagation(); setMenuChatId(menuChatId === chat.id ? null : chat.id); }}
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      )}

      {/* Dropdown Menu */}
      {menuChatId === chat.id && (
        <div className="chat-menu-container absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden text-sm animate-in fade-in zoom-in-95 duration-100">
          <button onClick={(e) => { e.stopPropagation(); togglePin(chat.id); setMenuChatId(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
            <Pin size={14} /> {chat.pinned ? 'Unpin' : 'Pin'}
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
            <Edit2 size={14} /> Rename
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
            <FileText size={14} /> Summarize
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
            <Archive size={14} /> Archive
          </button>
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
          <button onClick={(e) => { e.stopPropagation(); deleteConversation(chat.id); setMenuChatId(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-left">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );

  // Common Profile Trigger (used in both modes but styled differently)
  const ProfileTrigger = () => (
    <button
      onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
      className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'justify-between p-2'} rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors group`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-900">
          {user?.name?.charAt(0) || 'JD'}
        </div>
        {!isCollapsed && (
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">{user?.name || 'John Doe'}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Future-ready learner</div>
          </div>
        )}
      </div>
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar-light dark:bg-sidebar-dark border-r border-transparent dark:border-white/5 transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 w-[260px]' : isCollapsed ? 'w-[80px] -translate-x-full md:translate-x-0' : 'w-[260px] -translate-x-full md:translate-x-0'}
        `}
      >

        {/* ==================== EXPANDED MODE ==================== */}
        {!isCollapsed && (
          <>
            {/* Expanded Header */}
            <div className="p-3 space-y-4">

              {/* Top Row: Logo + Toggle */}
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="font-bold text-lg tracking-tight flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs">H</div>
                  Horizon
                </span>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all group border border-dashed border-gray-300 dark:border-gray-700"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Plus size={16} /> New Chat
                </span>
                <Edit2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100" />
              </button>

              {/* Search */}
              <div className="relative group px-1">
                <Search size={14} className="absolute left-4 top-2.5 text-gray-500 group-focus-within:text-gray-800 dark:group-focus-within:text-gray-200 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-transparent rounded-lg text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:border-black dark:focus:border-white outline-none transition-all shadow-sm"
                />
              </div>
            </div>



            {/* Expanded Content List */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none pb-2">
              <h3 className="px-5 text-xs font-semibold text-gray-400 mb-2 mt-2 uppercase tracking-wide">Explore</h3>
              <div className="mb-4">
                <NavItem to="/new-home" icon={LayoutGrid} label="My Dashboard" active={location.pathname === '/new-home'} />
                <NavItem to="/assess" icon={BookOpen} label="Assessment" active={location.pathname === '/assess'} />

                {/* Roadmaps Dropdown */}
                <div className="mx-2">
                  <button
                    onClick={() => setIsRoadmapsOpen(!isRoadmapsOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 ${location.pathname.includes('/roadmap') ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Map size={18} />
                      <span className="text-sm font-medium">Roadmaps</span>
                    </div>
                    <PanelLeftOpen size={14} className={`transform transition-transform ${isRoadmapsOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {isRoadmapsOpen && (
                    <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-800 pl-2">
                      {['AI Engineer', 'Software Engineer', 'Data Engineer', 'Data Analyst'].map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            if (role === 'Software Engineer') navigate('/roadmaps/software-engineer');
                            else if (role === 'Data Engineer') navigate('/roadmaps/data-engineer');
                            else if (role === 'Data Analyst') navigate('/roadmaps/data-analyst');
                            else if (role === 'AI Engineer') navigate('/roadmaps/ai-ml');
                            else navigate('/roadmaps');
                          }}
                          className="w-full text-left px-3 py-1.5 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <NavItem to="/resume-analyzer" icon={FileText} label="Resume Analyzer" active={location.pathname === '/resume-analyzer'} />
                <NavItem to="/news" icon={TrendingUp} label="Updates" active={location.pathname === '/news'} />
              </div>

              {pinnedChats.length > 0 && (
                <div className="mb-4">
                  <h3 className="px-5 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Pinned</h3>
                  <div className="space-y-0.5">
                    {pinnedChats.map(chat => <ConversationItem key={chat.id} chat={chat} />)}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="px-5 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Recent</h3>
                <div className="space-y-0.5">
                  {recentChats.map(chat => <ConversationItem key={chat.id} chat={chat} />)}
                </div>
              </div>
            </div>
          </>
        )}


        {/* ==================== COLLAPSED MODE ==================== */}
        {isCollapsed && (
          <div className="flex-1 flex flex-col items-center pt-4 pb-2 space-y-6">

            {/* Top: Logo Placeholder */}
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold mb-4 cursor-pointer" onClick={handleExpand} title="Expand Sidebar">
              H
            </div>

            {/* SECTION ICONS (Grouped logic) */}

            {/* Explore Section Group */}
            <div className="flex flex-col gap-4 w-full px-2">
              <button onClick={handleExpand} className="p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex justify-center" title="Explore">
                <LayoutGrid size={22} />
              </button>
            </div>

            {/* Pinned Section Group */}
            <div className="flex flex-col gap-4 w-full px-2">
              <div className="h-px w-8 mx-auto bg-gray-200 dark:bg-gray-800" />
              <button onClick={handleExpand} className="p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex justify-center" title="Pinned Chats">
                <Pin size={22} />
              </button>
            </div>

            {/* Chats Section Group */}
            <div className="flex flex-col gap-4 w-full px-2">
              <div className="h-px w-8 mx-auto bg-gray-200 dark:bg-gray-800" />
              <button onClick={handleExpand} className="p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex justify-center" title="Recent Chats">
                <MessageSquare size={22} />
              </button>
            </div>

            <div className="flex-1" /> {/* Spacer */}

            {/* New Chat (Mini) */}
            <button
              onClick={handleNewChat}
              className="p-3 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:opacity-90 transition-opacity mb-2"
              title="New Chat"
            >
              <Plus size={20} />
            </button>
          </div>
        )}

        {/* BOTTOM PROFILE (Common) */}
        <div className="p-2 border-t border-gray-200 dark:border-white/10 relative" ref={profileMenuRef}>
          <ProfileTrigger />

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div className={`absolute bottom-full ${isCollapsed ? 'left-2 mb-2 w-64' : 'left-2 right-2 mb-2'} bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2`}>

                {/* Dropdown Header */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'John Doe'}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Undergraduate • Engineering</p>
                </div>

                {/* Menu Items */}
                <div className="p-1.5 space-y-0.5">
                  <button onClick={onOpenSettings} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors">
                    <SettingsIcon size={16} /> Preferences
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors">
                    <User size={16} /> Learning Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors">
                    <Clock size={16} /> Activity History
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors">
                    <Bookmark size={16} /> Saved Items
                  </button>
                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors">
                    <HelpCircle size={16} /> Help & Feedback
                  </button>
                  <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm text-red-600 dark:text-red-400 transition-colors">
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;

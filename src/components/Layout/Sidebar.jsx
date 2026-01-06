import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Map,
  Globe,
  Newspaper,
  History,
  Settings,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, setIsMobileOpen, collapsed, setCollapsed }) => {
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Assess My Knowledge', icon: BookOpen, path: '/assess' },
    { name: 'My Roadmaps', icon: Map, path: '/roadmaps' },
    { name: 'Explore Domains', icon: Globe, path: '/explore' },
    { name: 'Resume Analyzer', icon: FileText, path: '/resume-analyzer' },
    { name: 'News & Trends', icon: Newspaper, path: '/news' },
    { name: 'Learning History', icon: History, path: '/history' },
    { name: 'Chat AI', icon: MessageSquare, path: '/chat' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className={`flex items-center h-16 px-4 border-b border-slate-800 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent truncate">
            Horizon
          </span>
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-3 rounded-lg transition-colors group relative
                    ${isActive
                      ? 'bg-blue-600/10 text-accent'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                  `}
                  title={collapsed ? item.name : ''}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon size={22} className={`min-w-[22px] ${collapsed ? 'mx-auto' : 'mr-3'}`} />

                  {!collapsed && (
                    <span className="font-medium truncate">{item.name}</span>
                  )}

                  {/* Tooltip for collapsed mode */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700">
                      {item.name}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer / Settings */}
        <div className="p-4 border-t border-slate-800">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center px-3 py-3 rounded-lg transition-colors
              ${isActive
                ? 'bg-blue-600/10 text-accent'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
            `}
            title="Settings"
          >
            <Settings size={22} className={`min-w-[22px] ${collapsed ? 'mx-auto' : 'mr-3'}`} />
            {!collapsed && <span className="font-medium">Settings</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

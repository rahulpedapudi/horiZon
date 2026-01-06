import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-6">
      <button
        className="mr-4 text-slate-400 hover:text-white md:hidden"
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </button>

      {/* Brand specific to mobile header mostly, or just global title context */}
      <div className="hidden md:flex items-center text-slate-100 font-semibold text-lg mr-8">
        Horizon
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search topics, skills, chats..."
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border-slate-700 border rounded-full text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center space-x-4">
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-slate-900 hover:ring-blue-500 transition-all">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;

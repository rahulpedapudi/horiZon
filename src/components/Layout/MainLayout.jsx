import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-primary text-text-primary font-sans selection:bg-accent selection:text-white">
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      <div 
        className={`transition-all duration-300 min-h-screen flex flex-col
          ${collapsed ? 'md:pl-20' : 'md:pl-64'}
        `}
      >
        <Header onMenuClick={() => setIsMobileOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

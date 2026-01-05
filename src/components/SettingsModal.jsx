import React from 'react';
import { X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const { settings, setSettings } = useChat();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mx-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Appearance Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Appearance</h3>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'system'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all
                    ${theme === t 
                      ? 'border-gray-900 dark:border-white bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500 dark:text-gray-400'}
                  `}
                >
                  <span className="capitalize font-medium text-sm">{t}</span>
                  {theme === t && <Check size={16} className="mt-1" />}
                </button>
              ))}
            </div>
          </section>

          {/* Chat Preferences Section */}
          <section>
             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Chat Preferences</h3>
             
             <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Show Timestamps</span>
                   <button 
                     onClick={() => setSettings({ ...settings, showTimestamps: !settings.showTimestamps })}
                     className={`w-11 h-6 flex items-center rounded-full transition-colors ${settings.showTimestamps ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'}`}
                   >
                      <span className={`w-4 h-4 rounded-full shadow transform transition-transform ${settings.showTimestamps ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'}`} />
                   </button>
                </div>

                 <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Density</span>
                   <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                      {['compact', 'comfortable'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSettings({ ...settings, density: d })}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${settings.density === d ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                          {d}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* General Section */}
          <section>
             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">General</h3>
             <button className="w-full py-2.5 px-4 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-medium text-left flex items-center justify-between group">
               Clear all chat history
               <span className="opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
             </button>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

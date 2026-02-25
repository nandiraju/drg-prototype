import React from 'react';
import { Bell, UserCircle, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-clinical-border dark:border-dark-border h-16 flex items-center px-4 md:px-8 justify-between transition-colors duration-200">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patients, drugs..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-clinical-blue focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 rounded-lg text-sm w-64 lg:w-96 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-dark-card"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-dark-border mx-1"></div>

        <button className="flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <UserCircle className="w-8 h-8 text-slate-400" />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-white">Dr. Sarah Chen</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Medical Oncology</p>
          </div>
        </button>
      </div>
    </nav>
  );
};

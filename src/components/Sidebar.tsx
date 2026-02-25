import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calculator, Microscope, 
  FileText, BarChart3, Pill, GraduationCap, 
  ChevronLeft, ChevronRight, Menu, ClipboardList, LogOut
} from 'lucide-react';
import { cn } from '../types';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: ClipboardList, label: 'Order Wizard', path: '/orders' },
  { icon: Calculator, label: 'Calculators', path: '/calculators' },
  { icon: Microscope, label: 'Clinical Trials', path: '/trials' },
  { icon: Pill, label: 'Drug DB', path: '/drugs' },
  { icon: Users, label: 'Patients Like Me', path: '/patients-like-me' },
  { icon: GraduationCap, label: 'Education', path: '/quiz' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [window.location.pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-clinical-blue text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-dark-card border-r border-clinical-border dark:border-dark-border transition-all duration-300 z-40 flex flex-col",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          "h-16 flex items-center border-b border-clinical-border dark:border-dark-border",
          isCollapsed ? "justify-center px-0" : "px-6"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-clinical-blue rounded-lg flex items-center justify-center shrink-0">
              <Microscope className="text-white w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Dr.<span className="text-clinical-blue">G</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center rounded-xl text-sm font-medium transition-all group relative",
                isCollapsed
                  ? "justify-center w-full py-3 px-0"
                  : "gap-3 px-3 py-2.5",
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/30 text-clinical-blue" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110")} />
              {!isCollapsed && (
                <span className="whitespace-nowrap opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse Toggle (Desktop only) */}
        <div className="p-4 border-t border-clinical-border dark:border-dark-border hidden lg:flex flex-col gap-2">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!isCollapsed && <span className="ml-2 text-xs font-bold uppercase tracking-wider">Collapse</span>}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors group"
            title="Logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Spacer for main content */}
      <div 
        className={cn(
          "hidden lg:block transition-all duration-300 shrink-0",
          isCollapsed ? "w-20" : "w-64"
        )} 
      />
    </>
  );
};

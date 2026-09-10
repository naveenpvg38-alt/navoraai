import React, { useState, useEffect } from 'react';
import { Sparkles, Bookmark, LogOut, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeView, setActiveView, user, onOpenAuth, onLogout, onGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-lg shadow-sm dark:shadow-none'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* 1. Brandmark Left: NAVORA · AI */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 group cursor-pointer focus:outline-none"
        >
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
            NAVORA
          </span>

          {/* Pulsing Neon Beacon Dot */}
          <span className="relative flex h-2 w-2 mx-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>

          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-gradient-cyan">
            AI
          </span>
        </button>

        {/* 2. Center: Clean, simple navigation links (no borders) */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              activeView === 'home'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setActiveView('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeView === 'planner'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>Plan Outing</span>
          </button>

          {user && (
            <button
              onClick={() => {
                setActiveView('saved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
                activeView === 'saved'
                  ? 'text-violet-600 dark:text-violet-400 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              <span>Saved</span>
            </button>
          )}
        </nav>

        {/* 3. Right: Theme Toggle & Actions (clean, no heavy borders) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            className="p-2 rounded-full cursor-pointer transition-colors hover:bg-slate-200/60 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-300"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {user ? (
            <>
              <button
                onClick={() => {
                  setActiveView('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-[11px] font-bold text-white uppercase leading-none">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">{user.name || 'Profile'}</span>
              </button>
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={onGetStarted ? onGetStarted : () => onOpenAuth('signup')}
                className="btn-primary !py-2 !px-4 sm:!px-5 !text-xs sm:!text-sm !rounded-full !gap-1.5 cursor-pointer shadow-none hover:shadow-glow-cyan transition-all group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


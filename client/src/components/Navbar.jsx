import React, { useState, useEffect } from 'react';
import { Sparkles, Bookmark, LogOut, ArrowRight, User as UserIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NavLink = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`relative px-3.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer rounded-full select-none ${
      active
        ? 'text-slate-900 dark:text-white bg-white dark:bg-white/10 border border-slate-300/80 dark:border-white/12 shadow-sm'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
    }`}
  >
    <span className="flex items-center gap-1.5">
      {icon}
      <span>{label}</span>
    </span>
  </button>
);

export default function Navbar({ activeView, setActiveView, user, onOpenAuth, onLogout, onGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 flex justify-center pointer-events-none px-3 sm:px-6 md:px-8 select-none">
      {/* ── WIDE FLOATING DYNAMIC ISLAND NAVBAR ── */}
      <nav
        className={`pointer-events-auto w-full max-w-5xl lg:max-w-6xl flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full transition-all duration-300 ease-out border ${
          isScrolled
            ? 'border-cyan-500/40 bg-white/95 dark:bg-[#080E1D]/95 text-slate-800 dark:text-white shadow-[0_14px_45px_-5px_rgba(0,0,0,0.12),0_0_25px_-3px_rgba(34,211,238,0.2)] dark:shadow-[0_18px_50px_-5px_rgba(0,0,0,0.85),0_0_30px_-3px_rgba(34,211,238,0.25)]'
            : 'border-slate-200/90 dark:border-white/12 bg-white/90 dark:bg-[#090F20]/90 text-slate-800 dark:text-white shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08),0_0_15px_-3px_rgba(34,211,238,0.1)] dark:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.65),0_0_20px_-3px_rgba(34,211,238,0.15)]'
        }`}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        {/* 1. Brandmark Left: NAVORA · AI */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 group cursor-pointer focus:outline-none pl-1 pr-1.5 shrink-0"
          >
            <span className="font-display font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors drop-shadow-sm">
              NAVORA
            </span>

            {/* Pulsing Neon Beacon Dot */}
            <span className="relative flex h-2 w-2 mx-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            </span>

            <span className="font-display font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-gradient-cyan">
              AI
            </span>
          </button>

          {/* Subtle Tumkur badge */}
          <span className="hidden md:inline-flex items-center text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300">
            Tumkur Circuit
          </span>
        </div>

        {/* 2. Center Nav Links (Home, Plan Outing, Saved) */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.06]">
          <NavLink
            label="Home"
            active={activeView === 'home'}
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <NavLink
            label="Plan Outing"
            active={activeView === 'planner'}
            onClick={() => {
              setActiveView('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            icon={<Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />}
          />
          {user && (
            <NavLink
              label="Saved"
              active={activeView === 'saved'}
              onClick={() => {
                setActiveView('saved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              icon={<Bookmark className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />}
            />
          )}
        </div>

        {/* 3. Right: Theme Switcher & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            className="p-1.5 sm:p-2 rounded-full cursor-pointer transition-all duration-200 active:scale-90 border border-slate-200/90 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/90 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-300 shrink-0 shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Vertical Divider */}
          <span className="h-4 w-px bg-slate-200 dark:bg-white/12 shrink-0 hidden sm:inline-block" />

          {user ? (
            <>
              <button
                onClick={() => {
                  setActiveView('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  activeView === 'profile'
                    ? 'bg-violet-500/15 border-violet-500/35 text-violet-600 dark:text-violet-300 shadow-sm'
                    : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 bg-slate-100/50 dark:bg-white/4'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white uppercase leading-none shrink-0">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden md:inline max-w-[80px] truncate">{user.name || 'Profile'}</span>
              </button>
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 border border-transparent hover:border-rose-500/25 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden md:inline-block px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer font-medium"
              >
                Log In
              </button>
              <button
                onClick={onGetStarted ? onGetStarted : () => onOpenAuth('signup')}
                className="btn-primary !py-1.5 sm:!py-2 !px-3.5 sm:!px-5 !text-xs sm:!text-[13px] !rounded-full !gap-1.5 cursor-pointer shadow-glow-sm hover:shadow-glow-cyan transition-all group shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}


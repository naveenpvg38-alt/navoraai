import React, { useState, useEffect } from 'react';
import { Sparkles, Bookmark, LogOut, ArrowRight, User as UserIcon } from 'lucide-react';

const NavLink = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`relative px-2.5 sm:px-3 py-1 text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer rounded-full select-none ${
      active
        ? 'text-white bg-white/10 border border-white/12 shadow-sm'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
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
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-3 sm:px-6 select-none">
      {/* ── PERMANENT FLOATING DYNAMIC ISLAND CAPSULE ── */}
      <nav
        className={`pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ease-out border ${
          isScrolled
            ? 'border-cyan-500/35 bg-[#080E1D]/95 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.8),0_0_24px_-3px_rgba(34,211,238,0.25)]'
            : 'border-white/12 bg-[#090F20]/88 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6),0_0_15px_-3px_rgba(34,211,238,0.12)]'
        }`}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        {/* 1. Brandmark: NAVORA · AI */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 group cursor-pointer focus:outline-none pl-1 pr-1.5 shrink-0"
        >
          <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)]">
            NAVORA
          </span>

          {/* Pulsing Neon Beacon Dot */}
          <span className="relative flex h-2 w-2 mx-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
          </span>

          <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-gradient-cyan">
            AI
          </span>
        </button>

        {/* Vertical Divider */}
        <span className="h-4 w-px bg-white/12 shrink-0 hidden sm:inline-block" />

        {/* 2. Center Nav Links (Home, Plan Outing, Saved) */}
        <div className="hidden sm:flex items-center gap-1">
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
            icon={<Sparkles className="w-3 h-3 text-cyan-400" />}
          />
          {user && (
            <NavLink
              label="Saved"
              active={activeView === 'saved'}
              onClick={() => {
                setActiveView('saved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              icon={<Bookmark className="w-3 h-3 text-violet-400" />}
            />
          )}
        </div>

        {/* Vertical Divider */}
        <span className="h-4 w-px bg-white/12 shrink-0" />

        {/* 3. Right: Auth or Combined Get Started */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {user ? (
            <>
              <button
                onClick={() => {
                  setActiveView('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  activeView === 'profile'
                    ? 'bg-violet-500/15 border-violet-500/35 text-violet-300'
                    : 'border-white/10 text-slate-300 hover:text-white hover:border-white/20 bg-white/4'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white uppercase leading-none shrink-0">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden md:inline max-w-[70px] truncate">{user.name || 'Profile'}</span>
              </button>
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 rounded-full text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/25 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden md:inline-block px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer font-medium"
              >
                Log In
              </button>
              <button
                onClick={onGetStarted ? onGetStarted : () => onOpenAuth('signup')}
                className="btn-primary !py-1 sm:!py-1.5 !px-3 sm:!px-4 !text-xs sm:!text-[13px] !rounded-full !gap-1.5 cursor-pointer shadow-glow-sm hover:shadow-glow-cyan transition-all group shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

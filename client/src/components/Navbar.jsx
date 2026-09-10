import React, { useState, useEffect } from 'react';
import { Sparkles, Bookmark, LogOut, ArrowRight } from 'lucide-react';

const NavLink = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`relative px-3 py-1.5 text-[13px] font-medium transition-all duration-200 cursor-pointer rounded-full ${
      active
        ? 'text-white'
        : 'text-slate-500 hover:text-slate-200'
    }`}
  >
    {active && (
      <span className="absolute inset-0 rounded-full bg-white/8 border border-white/10" />
    )}
    <span className="relative flex items-center gap-1.5">
      {icon}
      {label}
    </span>
  </button>
);

export default function Navbar({ activeView, setActiveView, user, onOpenAuth, onLogout, onGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ease-out ${
        isScrolled
          ? 'pt-2.5 sm:pt-3.5 px-3 sm:px-6 flex justify-center pointer-events-none'
          : 'w-full border-b border-white/[0.06]'
      }`}
      style={{
        background: isScrolled ? 'transparent' : 'rgba(11, 17, 32, 0.92)',
        backdropFilter: isScrolled ? 'none' : 'blur(20px)',
        WebkitBackdropFilter: isScrolled ? 'none' : 'blur(20px)',
        paddingTop: isScrolled ? undefined : 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div
        className={`transition-all duration-300 ease-out flex items-center justify-between ${
          isScrolled
            ? 'pointer-events-auto rounded-full border border-cyan-500/30 bg-[#0B1120]/95 backdrop-blur-2xl shadow-[0_12px_40px_-5px_rgba(0,0,0,0.7),0_0_24px_-3px_rgba(34,211,238,0.28)] px-3.5 sm:px-5 py-1.5 sm:py-2 gap-3 sm:gap-6'
            : 'max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-[60px] w-full'
        }`}
      >
        {/* Brand wordmark */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none select-none shrink-0"
        >
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_12px_rgba(255,255,255,0.1)] ${
              isScrolled ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
            }`}>
              NAVORA
            </span>
            {/* Pulsing Neon Beacon Dot */}
            <span className="relative flex h-2 w-2 mx-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            </span>
            <span className={`font-display font-extrabold tracking-tight text-gradient-cyan ${
              isScrolled ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
            }`}>
              AI
            </span>
          </div>
          {!isScrolled && (
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-slate-500 uppercase ml-1 pl-2 border-l border-white/10">
              Tumkur
            </span>
          )}
        </button>

        {/* Center nav — desktop only */}
        <nav className={`items-center gap-0.5 ${isScrolled ? 'hidden lg:flex' : 'hidden md:flex'}`}>
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
              icon={<Bookmark className="w-3 h-3" />}
            />
          )}
        </nav>

        {/* Right: Auth / Combined Get Started action */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {user ? (
            <>
              <button
                onClick={() => {
                  setActiveView('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 cursor-pointer ${
                  activeView === 'profile'
                    ? 'bg-violet-500/10 border-violet-500/30 text-violet-300'
                    : 'border-white/8 text-slate-400 hover:text-white hover:border-white/15 bg-white/3'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-[11px] font-bold text-white uppercase leading-none shrink-0">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{user.name || 'Profile'}</span>
              </button>
              <button
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 sm:p-2 rounded-full text-slate-600 hover:text-rose-400 border border-transparent hover:border-rose-500/20 hover:bg-rose-500/8 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {!isScrolled && (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hidden sm:block px-4 py-1.5 text-[13px] text-slate-400 hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Log In
                </button>
              )}
              {/* Combined Get Started Button */}
              <button
                onClick={onGetStarted ? onGetStarted : () => onOpenAuth('signup')}
                className={`btn-primary !gap-1.5 cursor-pointer shadow-glow-sm hover:shadow-glow-cyan transition-all group ${
                  isScrolled
                    ? '!py-1.5 sm:!py-2 !px-3.5 sm:!px-4 !text-xs sm:!text-[13px] !rounded-full'
                    : '!py-2 !px-4 sm:!px-5 !text-[13px] !rounded-xl'
                }`}
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

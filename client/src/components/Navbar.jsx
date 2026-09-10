import React from 'react';
import { Sparkles, Bookmark, LogOut } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] transition-all duration-200"
      style={{
        background: 'rgba(11, 17, 32, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-[60px] flex items-center justify-between">

        {/* Brand wordmark logo */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none select-none"
        >
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_12px_rgba(255,255,255,0.1)]">
              NAVORA
            </span>
            <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-all">
              AI
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-slate-500 uppercase ml-1 pl-2 border-l border-white/10">
            Tumkur
          </span>
        </button>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex items-center gap-0.5">
          <NavLink label="Home"       active={activeView === 'home'}    onClick={() => setActiveView('home')} />
          <NavLink
            label="Plan Outing"
            active={activeView === 'planner'}
            onClick={() => setActiveView('planner')}
            icon={<Sparkles className="w-3 h-3 text-cyan-400" />}
          />
          {user && (
            <NavLink
              label="Saved"
              active={activeView === 'saved'}
              onClick={() => setActiveView('saved')}
              icon={<Bookmark className="w-3 h-3" />}
            />
          )}
        </nav>

        {/* Right: auth — mobile shows compact version */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {user ? (
            <>
              <button
                onClick={() => setActiveView('profile')}
                className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-xl text-[13px] font-medium border transition-all duration-200 cursor-pointer ${
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
                className="p-2 rounded-xl text-slate-600 hover:text-rose-400 border border-transparent hover:border-rose-500/20 hover:bg-rose-500/8 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:block px-4 py-1.5 text-[13px] text-slate-400 hover:text-white transition-colors cursor-pointer font-medium"
              >
                Log In
              </button>
              <button
                onClick={onGetStarted ? onGetStarted : () => onOpenAuth('signup')}
                className="btn-primary !py-2 !px-4 sm:!px-5 !text-[13px] !rounded-xl !gap-0 cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

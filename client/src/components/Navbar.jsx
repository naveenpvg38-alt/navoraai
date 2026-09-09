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

        {/* Brand mark */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shrink-0"
            style={{ background: 'rgba(13,18,36,0.9)', border: '1px solid rgba(34,211,238,0.25)', boxShadow: '0 0 16px rgba(34,211,238,0.12)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9.5" stroke="url(#nav-ring)" strokeWidth="1" opacity="0.45"/>
              <line x1="12" y1="2.8" x2="12" y2="4.5" stroke="#22D3EE" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="12" y1="19.5" x2="12" y2="21.2" stroke="#7C3AED" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="19.5" y1="12" x2="21.2" y2="12" stroke="#22D3EE" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="2.8" y1="12" x2="4.5" y2="12" stroke="#22D3EE" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M12 5.5L13.3 11H10.7L12 5.5Z" fill="#22D3EE"/>
              <path d="M12 18.5L10.7 13H13.3L12 18.5Z" fill="#7C3AED" opacity="0.65"/>
              <circle cx="12" cy="12" r="1.7" fill="url(#nav-center)"/>
              <circle cx="5.2" cy="17.8" r="1.1" fill="#22D3EE" opacity="0.45"/>
              <circle cx="7.5" cy="15.8" r="0.7" fill="#22D3EE" opacity="0.3"/>
              <defs>
                <linearGradient id="nav-ring" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </linearGradient>
                <radialGradient id="nav-center" cx="50%" cy="50%" r="50%">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="leading-none">
            <span className="font-display font-extrabold text-base sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              NAVORA <span className="text-cyan-400">AI</span>
            </span>
            <span className="hidden sm:block label-overline text-slate-500 mt-0.5">
              Tumkur
            </span>
          </div>
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

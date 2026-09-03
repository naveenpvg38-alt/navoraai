import React from 'react';
import { Sparkles, Bookmark, LogOut } from 'lucide-react';

const NavLink = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-1.5 text-[13px] font-medium transition-all duration-200 cursor-pointer rounded-full ${
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

export default function Navbar({ activeView, setActiveView, user, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] transition-all duration-200"
      style={{ background: 'rgba(6, 8, 15, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">

        {/* Brand mark */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 group cursor-pointer focus:outline-none"
        >
          {/* Minimal SVG logo */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-600/15 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 transition-all duration-300 shadow-glow-sm">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.5 9H19L13.5 13L15.5 20L10 16L4.5 20L6.5 13L1 9H7.5L10 2Z"
                fill="url(#nb-grad)" />
              <defs>
                <linearGradient id="nb-grad" x1="1" y1="2" x2="19" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE"/>
                  <stop offset="1" stopColor="#7C3AED"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="leading-none">
            <span className="font-display text-[26px] text-white group-hover:text-gradient-cyan transition-all duration-300" style={{ fontWeight: 700, letterSpacing: '0.02em' }}>
              Navora <em style={{ fontStyle: 'italic', color: '#22D3EE' }}>AI</em>
            </span>
            <span className="hidden sm:block label-overline text-slate-600 mt-0.5">
              Tumkur District
            </span>
          </div>
        </button>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          <NavLink label="Home"      active={activeView === 'home'}    onClick={() => setActiveView('home')} />
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

        {/* Right: auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={() => setActiveView('profile')}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[13px] font-medium border transition-all duration-200 cursor-pointer ${
                  activeView === 'profile'
                    ? 'bg-violet-500/10 border-violet-500/30 text-violet-300'
                    : 'border-white/8 text-slate-400 hover:text-white hover:border-white/15 bg-white/3'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-[11px] font-bold text-white uppercase leading-none">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">{user.name || 'Profile'}</span>
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
                className="px-4 py-1.5 text-[13px] text-slate-400 hover:text-white transition-colors cursor-pointer font-medium"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn-primary !py-2 !px-5 !text-[13px] !rounded-xl !gap-0"
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

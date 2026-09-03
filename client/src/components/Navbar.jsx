import React from 'react';
import { Compass, Sparkles, User, Bookmark, LogOut, PlusCircle } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, user, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-glow-cyan/50 group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent group-hover:to-cyan-200">
              ✦ NAVORA AI
            </span>
            <span className="hidden sm:block text-[10px] text-cyan-400 font-medium tracking-wider uppercase -mt-0.5">
              Outing Planner
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveView('home')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeView === 'home'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveView('planner')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeView === 'planner'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-glow-cyan/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            Plan Outing
          </button>
          {user && (
            <button
              onClick={() => setActiveView('saved')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeView === 'saved'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Plans
            </button>
          )}
        </nav>

        {/* Auth / Profile Area */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  activeView === 'profile'
                    ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center text-[11px] font-bold text-white uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">
                  {user.name || 'Profile'}
                </span>
              </button>

              <button
                onClick={onLogout}
                title="Log Out"
                className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors duration-200 border border-transparent hover:border-rose-500/20"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-glow-cyan/30 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Home, Sparkles, Bookmark, User } from 'lucide-react';

export default function MobileNav({ activeView, setActiveView, user, onOpenAuth }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800/80 px-4 py-2 flex items-center justify-around">
      <button
        onClick={() => setActiveView('home')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
          activeView === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveView('planner')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
          activeView === 'planner' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className="relative">
          <Sparkles className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping-slow" />
        </div>
        <span>Plan</span>
      </button>

      <button
        onClick={() => {
          if (user) {
            setActiveView('saved');
          } else {
            onOpenAuth('login');
          }
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
          activeView === 'saved' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Bookmark className="w-5 h-5" />
        <span>Saved</span>
      </button>

      <button
        onClick={() => {
          if (user) {
            setActiveView('profile');
          } else {
            onOpenAuth('login');
          }
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
          activeView === 'profile' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <User className="w-5 h-5" />
        <span>{user ? 'Profile' : 'Log In'}</span>
      </button>
    </div>
  );
}

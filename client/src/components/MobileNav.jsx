import React from 'react';
import { Home, Sparkles, Bookmark, User } from 'lucide-react';

const navItems = [
  { id: 'home',    label: 'HOME',  icon: Home,     requiresAuth: false },
  { id: 'planner', label: 'PLAN',  icon: Sparkles, requiresAuth: false },
  { id: 'saved',   label: 'SAVED', icon: Bookmark, requiresAuth: true  },
  { id: 'profile', label: 'ME',    icon: User,     requiresAuth: true  },
];

export default function MobileNav({ activeView, setActiveView, user, onOpenAuth }) {
  const handleTap = (item) => {
    if (item.requiresAuth && !user) {
      onOpenAuth('login');
    } else {
      setActiveView(item.id);
    }
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 h-16"
      style={{
        background: 'rgba(11, 17, 32, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {navItems.map((item) => {
        const active = activeView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleTap(item)}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 cursor-pointer focus:outline-none group"
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  active ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'
                }`}
              />
              {item.id === 'planner' && !active && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              )}
            </div>

            {/* Active indicator bar */}
            <div className={`h-0.5 rounded-full transition-all duration-200 ${
              active ? 'w-5 bg-cyan-400' : 'w-0 bg-transparent'
            }`} />

            <span className={`text-[9px] font-mono tracking-widest transition-colors duration-200 ${
              active ? 'text-cyan-400' : 'text-slate-700'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

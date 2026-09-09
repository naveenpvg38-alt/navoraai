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
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around"
      style={{
        background: 'rgba(9, 14, 28, 0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      {navItems.map((item) => {
        const active = activeView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => handleTap(item)}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-3 cursor-pointer focus:outline-none relative"
            style={{ minHeight: '56px' }}
          >
            {/* Active glow background */}
            {active && (
              <span
                className="absolute inset-x-2 inset-y-1 rounded-xl"
                style={{ background: 'rgba(34,211,238,0.08)' }}
              />
            )}

            <div className="relative z-10">
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  active ? 'text-cyan-400' : 'text-slate-600'
                }`}
              />
              {/* Planner pulse dot */}
              {item.id === 'planner' && !active && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </div>

            <span className={`text-[9px] font-mono tracking-widest z-10 transition-colors duration-200 ${
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

import React, { useState } from 'react';
import {
  Compass,
  Home as HomeIcon,
  LogIn,
  User,
  Smartphone,
  ShieldCheck,
  FileText,
  X,
  Sparkles,
  Route,
  MapPin,
  BookmarkCheck
} from 'lucide-react';

export default function Footer({ setActiveView, onOpenAuth, user }) {
  const [modalContent, setModalContent] = useState(null); // 'privacy' | 'terms' | 'install' | null

  const handleNav = (view) => {
    if (setActiveView) {
      setActiveView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative font-poppins border-t border-white/10 bg-[#0B1120]/95 backdrop-blur-2xl text-slate-300 pt-9 pb-8 px-5 sm:px-8 lg:px-12 text-xs overflow-hidden">
      {/* Unique Ambient Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-violet-500 opacity-80" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ── TOP TIER: Brand & Navigation ────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/8">
          
          {/* Brand Left: Glowing Icon + Title + Live Telemetry */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="relative group/icon shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-white/5 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-transform group-hover/icon:scale-105">
                <Compass className="w-5 h-5 text-cyan-300 animate-spin-slow" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight leading-tight">
                  NAVORA <span className="text-gradient-cyan">AI</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 hidden sm:inline-block">
                  Tumkur Circuit Engine
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5 font-normal">
                Plan Less. Experience More.
              </p>
            </div>
          </div>

          {/* Navigation Links Right */}
          <nav className="flex items-center flex-wrap justify-center gap-3 sm:gap-5 text-xs text-slate-300 font-medium">
            <button
              onClick={() => handleNav('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <HomeIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNav('planner')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <Route className="w-3.5 h-3.5 text-cyan-400" />
              <span>Plan Outing</span>
            </button>

            {user ? (
              <button
                onClick={() => handleNav('profile')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Profile</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setModalContent('install')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-400" />
              <span>Install App</span>
            </button>

            <button
              onClick={() => setModalContent('privacy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setModalContent('terms')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Terms of Use</span>
            </button>
          </nav>
        </div>

        {/* ── UNIQUE SIGNATURE STRIP: Tumkur Waypoint Circuit Rail ── */}
        <div className="py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-x-2 gap-y-1">
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Tumkur Waypoints:
            </span>
            <span className="text-slate-300">DD Hills</span>
            <span className="text-cyan-400/60">➔</span>
            <span className="text-slate-300">Kyathsandra Thatte Idli</span>
            <span className="text-cyan-400/60">➔</span>
            <span className="text-slate-300">Madhugiri Monolith</span>
            <span className="text-cyan-400/60">➔</span>
            <span className="text-slate-300">Namada Chilume</span>
            <span className="text-cyan-400/60">➔</span>
            <span className="text-slate-300">Amanikere</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 shrink-0">
            <span className="flex items-center gap-1 text-emerald-400 font-sans font-medium">
              <span>✓</span> 0km Backtracking
            </span>
            <span>•</span>
            <span className="text-slate-400">10 Taluks</span>
          </div>
        </div>

        {/* ── BOTTOM TIER: Copyright & Developer Attribution ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-1">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-semibold">NAVORA AI</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-1.5 font-sans">
            <span>Designed & Developed by</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 font-mono text-[11px] font-bold text-cyan-300">
              &lt;/&gt;
            </span>
            <span className="text-white font-semibold hover:text-cyan-300 transition-colors">
              naveen_pvg
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Modal for Privacy / Terms / Install App */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B0F1E] border border-cyan-500/20 p-6 text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.1)]">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {modalContent === 'privacy' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" /> Privacy Policy
                </h3>
                <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed max-h-80 overflow-y-auto pr-2">
                  <p>NAVORA AI values your privacy. We collect only the preferences you provide to generate your personalized day itineraries for Tumkur District.</p>
                  <p>All itinerary calculations are processed securely and your personal account details are never sold or shared with third parties.</p>
                  <p>Geolocation data is accessed strictly with your permission to identify nearby starting landmarks in Tumkur District and is not tracked in the background.</p>
                </div>
              </div>
            )}

            {modalContent === 'terms' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" /> Terms of Use
                </h3>
                <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed max-h-80 overflow-y-auto pr-2">
                  <p>NAVORA AI provides simulated, AI-assisted itinerary recommendations specifically curated for Tumkur District, Karnataka.</p>
                  <p>Travel times and opening hours may vary due to local traffic, weather, and seasonal temple schedules. Travelers are advised to verify timings locally.</p>
                  <p>This platform was created as an academic innovation project demonstrating AI itinerary planning with zero-backtracking algorithms.</p>
                </div>
              </div>
            )}

            {modalContent === 'install' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-cyan-400" /> Install NAVORA AI App
                </h3>
                <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
                  <p>You can use NAVORA AI as a standalone web application on your device:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                    <li><strong className="text-white">Android (Chrome):</strong> Tap the browser menu (⋮) and select <em>"Add to Home screen"</em> or <em>"Install App"</em>.</li>
                    <li><strong className="text-white">iOS (Safari):</strong> Tap the Share button (⎋) and select <em>"Add to Home Screen"</em>.</li>
                    <li><strong className="text-white">Desktop:</strong> Click the install icon in the URL bar of Chrome/Edge to run as a desktop app.</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/8 text-right">
              <button
                onClick={() => setModalContent(null)}
                className="btn-primary text-xs !py-2 !px-5 !rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

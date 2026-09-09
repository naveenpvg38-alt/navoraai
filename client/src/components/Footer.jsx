import React, { useState, useEffect } from 'react';
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
  Download,
  CheckCircle2
} from 'lucide-react';
import NavoraLogo from './NavoraLogo';

export default function Footer({ setActiveView, onOpenAuth, user }) {
  const [modalContent, setModalContent] = useState(null); // 'privacy' | 'terms' | 'install' | null
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleTriggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

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
          
          {/* Brand Left: Glowing Hexagonal Tech Shield + Title + Live Telemetry */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <NavoraLogo size={42} withGlow={true} />

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
                Plan less, Experience more.
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-cyan-400" /> Install NAVORA AI Mobile App
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
                    PWA v1.0
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Install NAVORA AI on your <strong>Android</strong> or <strong>iOS (iPhone/iPad)</strong> device for an app experience with zero browser address bars, instant startup, and offline readiness across Tumkur.
                </p>

                {/* 1-Tap Android / Chrome Native Install Button */}
                {deferredPrompt && (
                  <button
                    onClick={handleTriggerInstall}
                    className="btn-primary w-full !py-3 !rounded-xl justify-center mb-4 cursor-pointer shadow-glow-sm hover:shadow-glow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install NAVORA AI on This Device (1-Tap)</span>
                  </button>
                )}

                {isInstalled && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>NAVORA AI is already installed on your device. Launch it directly from your home screen!</span>
                  </div>
                )}

                {/* Device-Specific Steps */}
                <div className="space-y-3 text-xs">
                  {/* Android Card */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <span>🤖</span> Android (Google Chrome & Edge)
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">Recommended</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Tap the top menu <strong className="text-slate-200">(⋮)</strong> in Chrome and select <strong className="text-cyan-300">"Install app"</strong> or <strong className="text-cyan-300">"Add to Home screen"</strong>.
                    </p>
                  </div>

                  {/* iOS Card */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <span>🍏</span> Apple iOS (iPhone & iPad Safari)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Safari</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      1. Open this website in <strong>Safari</strong>.<br />
                      2. Tap the <strong>Share</strong> button <strong className="text-cyan-300">⎋</strong> (bottom toolbar).<br />
                      3. Scroll down and tap <strong className="text-cyan-300">"Add to Home Screen" ➕</strong>.
                    </p>
                  </div>
                </div>

                {/* Features strip */}
                <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>✓ Standalone View</span>
                  <span>✓ Offline Cache</span>
                  <span>✓ Touch Optimized</span>
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

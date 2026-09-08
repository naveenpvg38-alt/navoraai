import React, { useState } from 'react';
import {
  Compass,
  Home as HomeIcon,
  LogIn,
  User,
  Smartphone,
  ShieldCheck,
  FileText,
  X
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
    <footer className="border-t border-white/10 bg-[#070A14] text-slate-300 py-8 px-5 sm:px-8 lg:px-12 text-xs">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Tier: Brand + Nav Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/8">
          
          {/* Brand Left */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-sm shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-display font-extrabold text-white text-base tracking-tight leading-tight">
                NAVORA AI
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Plan Less. Experience More.
              </p>
            </div>
          </div>

          {/* Nav Links Right */}
          <nav className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 text-xs text-slate-300">
            <button
              onClick={() => handleNav('home')}
              className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <HomeIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Home</span>
            </button>

            {user ? (
              <button
                onClick={() => handleNav('profile')}
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Profile</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setModalContent('install')}
              className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-400" />
              <span>Install App</span>
            </button>

            <button
              onClick={() => setModalContent('privacy')}
              className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setModalContent('terms')}
              className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Terms of Use</span>
            </button>
          </nav>
        </div>

        {/* Bottom Tier: Copyright + Designed & Developed by */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-semibold">NAVORA AI</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-1.5 font-sans">
            <span>Designed & Developed by</span>
            <span className="font-mono font-bold text-cyan-400">&lt;/&gt;</span>
            <span className="text-white font-semibold">naveen_pvg</span>
          </div>
        </div>

      </div>

      {/* Simple Clean Policy / Install Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0D1224] border border-white/10 p-6 text-slate-300 shadow-2xl">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {modalContent === 'privacy' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" /> Privacy Policy
                </h3>
                <div className="space-y-2 text-xs text-slate-400 leading-relaxed max-h-80 overflow-y-auto pr-2">
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
                <div className="space-y-2 text-xs text-slate-400 leading-relaxed max-h-80 overflow-y-auto pr-2">
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
                className="btn-primary text-xs !py-2 !px-5 !rounded-xl"
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

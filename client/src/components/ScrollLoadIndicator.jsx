import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollLoadIndicator() {
  const [scrollPct, setScrollPct] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down'); // 'down' | 'up'
  const [showBackToTop, setShowBackToTop] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;

      setScrollPct(pct);
      setShowBackToTop(winScroll > 300);

      // Determine scroll direction
      if (winScroll > lastScrollY.current + 2) {
        setScrollDirection('down');
      } else if (winScroll < lastScrollY.current - 2) {
        setScrollDirection('up');
      }
      lastScrollY.current = winScroll;

      // Active scrolling state
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Circular progress math for the floating glider
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPct / 100) * circumference;

  return (
    <>
      {/* ── 1. Top Cyber Scroll-Load Laser Rail ────────────────── */}
      <div className="fixed top-[60px] left-0 right-0 z-40 pointer-events-none select-none">
        {/* Track base */}
        <div className="w-full h-[3px] bg-white/[0.04] backdrop-blur-xs relative overflow-hidden">
          {/* Active progress beam */}
          <div
            className="h-full relative transition-all duration-150 ease-out"
            style={{
              width: `${scrollPct}%`,
              background: 'linear-gradient(90deg, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
              boxShadow: isScrolling
                ? '0 0 14px rgba(56, 189, 248, 0.9), 0 0 28px rgba(129, 140, 248, 0.6)'
                : '0 0 8px rgba(56, 189, 248, 0.5)',
            }}
          >
            {/* Shimmer laser scan wave traveling through the loaded beam */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent ${
                isScrolling ? 'animate-shimmer' : 'opacity-0'
              }`}
              style={{ backgroundSize: '200% 100%' }}
            />

            {/* Leading laser head particle */}
            {scrollPct > 0.5 && (
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#38BDF8,0_0_20px_#818CF8]"
                style={{
                  animation: isScrolling ? 'pulseGlow 1.2s ease-in-out infinite' : 'none',
                }}
              />
            )}
          </div>
        </div>

        {/* ── 2. Real-time Scroll Telemetry Badge (Active when scrolling) ── */}
        <div
          className={`absolute right-4 top-2 transition-all duration-300 pointer-events-none ${
            isScrolling && scrollPct > 1 && scrollPct < 99
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-1'
          }`}
        >
          <div
            className="px-2.5 py-1 rounded-full border text-[10px] font-mono font-medium flex items-center gap-1.5 shadow-lg"
            style={{
              background: 'rgba(11, 17, 32, 0.9)',
              borderColor: 'rgba(56, 189, 248, 0.3)',
              color: '#38BDF8',
              backdropFilter: 'blur(12px)',
            }}
          >
            {scrollDirection === 'down' ? (
              <ArrowDown className="w-3 h-3 text-cyan-400 animate-bounce" />
            ) : (
              <ArrowUp className="w-3 h-3 text-violet-400 animate-bounce" />
            )}
            <span>{Math.round(scrollPct)}% LOADED</span>
          </div>
        </div>
      </div>

      {/* ── 3. Floating Scroll Progress Glider (Bottom-Right) ── */}
      <div
        className={`fixed bottom-20 md:bottom-8 right-5 z-40 transition-all duration-400 ${
          showBackToTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          title={`Scrolled ${Math.round(scrollPct)}% · Click to scroll to top`}
          className="relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer group shadow-xl hover:scale-105 transition-all active:scale-95"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
          }}
        >
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="url(#scroll-ring-grad)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-150 ease-out"
            />
            <defs>
              <linearGradient id="scroll-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Icon */}
          <ArrowUp className="w-4 h-4 text-cyan-300 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
    </>
  );
}

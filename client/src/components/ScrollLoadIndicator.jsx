import React, { useState, useEffect, useRef } from 'react';

/**
 * ScrollLoadIndicator — Top Laser Progress Rail
 * Positioned at the very top of the viewport (top-0).
 * Automatically hides when scrolling downwards, and reappears when scrolling upwards or at the top.
 */
export default function ScrollLoadIndicator() {
  const [scrollPct, setScrollPct] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;

      setScrollPct(pct);

      // When scrolling downwards: hide the line
      // When scrolling upwards or near the top: show the line
      if (winScroll > lastScrollY.current && winScroll > 30) {
        setIsVisible(false);
      } else if (winScroll < lastScrollY.current || winScroll <= 30) {
        setIsVisible(true);
      }

      lastScrollY.current = winScroll;

      // Active scrolling state
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none transition-all duration-300 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
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
    </div>
  );
}

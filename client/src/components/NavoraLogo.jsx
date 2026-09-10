import React, { useState, useRef } from 'react';

/**
 * High-tech Crystalline Audio Chime
 * Synthesizes an interactive cyber harmonic ping on click/tap using Web Audio API.
 */
function playInteractivePing() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.18); // A6

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // AudioContext blocked or silent mode
  }
}

/**
 * NAVORA AI — Interactive 3D 'N' Brand Mark
 * Features:
 * - 3D Gyroscope / Mouse-tracking tilt physics
 * - Dual orbiting quantum energy sparks (accelerates on hover)
 * - Click / Tap interactive energy shockwave + audio harmonic chime
 * - Dynamic specular sheen and holographic backglow
 */
export default function NavoraLogo({
  size = 'md',
  className = '',
  withGlow = true,
  interactive = true,
  onClick
}) {
  const pixelSizes = {
    xs: 24,
    sm: 30,
    md: 38,
    lg: 52,
    xl: 72,
    '2xl': 96
  };

  const dim = typeof size === 'number' ? size : (pixelSizes[size] || 38);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const logoRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!interactive || !logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 22), y: x * 22 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleTrigger = (e) => {
    if (!interactive) return;
    playInteractivePing();
    setRippleKey(prev => prev + 1);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);

    // Subtle device vibration on touch devices
    if ('vibrate' in navigator) {
      navigator.vibrate(35);
    }

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={logoRef}
      onMouseMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handlePointerLeave}
      onClick={handleTrigger}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        width: dim,
        height: dim,
        perspective: '600px'
      }}
      title={interactive ? '✦ Tap to interact with NAVORA AI' : undefined}
    >
      <style>{`
        @keyframes orbitCW {
          0% { transform: rotate(0deg) translateX(${dim * 0.46}px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(${dim * 0.46}px) rotate(-360deg); }
        }
        @keyframes orbitCCW {
          0% { transform: rotate(180deg) translateX(${dim * 0.46}px) rotate(-180deg); }
          100% { transform: rotate(-180deg) translateX(${dim * 0.46}px) rotate(180deg); }
        }
        @keyframes shockwave {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* 1. Outer Ambient Glow */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
          style={{
            background: isHovered
              ? 'radial-gradient(circle, rgba(34,211,238,0.7) 0%, rgba(129,140,248,0.5) 45%, transparent 75%)'
              : 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(129,140,248,0.25) 45%, transparent 70%)',
            transform: isHovered ? 'scale(1.3)' : 'scale(1.05)',
            filter: 'blur(10px)',
            opacity: 0.75
          }}
        />
      )}

      {/* 2. Interactive Shockwave Ripple Ring (fires on click/tap) */}
      {isPulsing && (
        <div
          key={rippleKey}
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400 pointer-events-none"
          style={{ animation: 'shockwave 0.6s ease-out forwards' }}
        />
      )}

      {/* 3. Orbiting Cyan Quantum Spark (Speed adjusts on hover) */}
      <div
        className="absolute w-2 h-2 rounded-full bg-cyan-300 pointer-events-none z-20"
        style={{
          boxShadow: '0 0 8px #22D3EE, 0 0 14px #22D3EE',
          animation: `orbitCW ${isHovered ? '1.8s' : '5.5s'} linear infinite`,
          width: Math.max(3, dim * 0.08),
          height: Math.max(3, dim * 0.08)
        }}
      />

      {/* 4. Orbiting Violet Quantum Spark */}
      <div
        className="absolute w-2 h-2 rounded-full bg-violet-400 pointer-events-none z-20"
        style={{
          boxShadow: '0 0 8px #A855F7, 0 0 14px #7C3AED',
          animation: `orbitCCW ${isHovered ? '2.2s' : '6.5s'} linear infinite`,
          width: Math.max(3, dim * 0.07),
          height: Math.max(3, dim * 0.07)
        }}
      />

      {/* 5. 3D Tilt Container */}
      <div
        className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center p-[6%] transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.08 : 1})`,
          background: 'linear-gradient(135deg, rgba(13, 22, 44, 0.92) 0%, rgba(9, 14, 28, 0.95) 100%)',
          border: isHovered ? '1px solid rgba(34, 211, 238, 0.55)' : '1px solid rgba(34, 211, 238, 0.25)',
          boxShadow: isHovered
            ? '0 0 25px rgba(34, 211, 238, 0.3), inset 0 0 15px rgba(34, 211, 238, 0.15)'
            : '0 0 16px rgba(34, 211, 238, 0.12), inset 0 0 8px rgba(34, 211, 238, 0.05)'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Left Stem: Deep Cyan to Ocean Blue */}
            <linearGradient id="n-interactive-left" x1="11" y1="8" x2="25" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="60%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Right Stem: Electric Indigo to Cyber Violet */}
            <linearGradient id="n-interactive-right" x1="39" y1="8" x2="53" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>

            {/* Dynamic Origami Slash Ribbon: Radiant Neon Flow */}
            <linearGradient id="n-interactive-diag" x1="11" y1="8" x2="53" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="35%" stopColor="#38BDF8" />
              <stop offset="70%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            {/* Specular sheen highlight */}
            <linearGradient id="n-interactive-sheen" x1="11" y1="8" x2="35" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isHovered ? 0.95 : 0.75} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Drop shadow under the folded diagonal ribbon */}
            <filter id="n-blade-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-2" dy="2" stdDeviation="2.5" floodColor="#050B17" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Left Vertical Pillar */}
          <rect
            x="11"
            y="8"
            width="14"
            height="48"
            rx="4.5"
            fill="url(#n-interactive-left)"
          />

          {/* Right Vertical Pillar */}
          <rect
            x="39"
            y="8"
            width="14"
            height="48"
            rx="4.5"
            fill="url(#n-interactive-right)"
          />

          {/* Dimensional Diagonal Ribbon Fold (in front) */}
          <path
            d="M 11 12.5 C 11 10 13 8 15.5 8 L 24.5 8 C 25.8 8 27.2 8.8 28 9.9 L 52.5 50.8 C 53.5 52.4 52.6 54.6 50.7 55.4 C 49.9 55.8 49 56 48.2 56 L 39.5 56 C 38.2 56 36.8 55.2 36 54.1 L 11.5 13.2 C 11.2 12.8 11 12.2 11 11.5 Z"
            fill="url(#n-interactive-diag)"
            filter="url(#n-blade-shadow)"
          />

          {/* Specular Sheen Highlight on Blade Edge */}
          <path
            d="M 12 11 C 12 9.5 13.5 8.5 15.5 8.5 L 23 8.5 L 34 25 L 28 26 Z"
            fill="url(#n-interactive-sheen)"
          />

          {/* Origin Waypoint Node (Top Left) */}
          <circle cx="18" cy="14" r="2.2" fill="#FFFFFF" />
          <circle cx="18" cy="14" r="4.5" fill="#38BDF8" opacity="0.4" />

          {/* Destination Waypoint Node (Bottom Right) */}
          <circle cx="46" cy="50" r="2.2" fill="#FFFFFF" />
          <circle cx="46" cy="50" r="4.5" fill="#C084FC" opacity="0.4" />

          {/* Central Crossroads Navigation Diamond */}
          <polygon
            points="32,29.5 34.5,32 32,34.5 29.5,32"
            fill="#FFFFFF"
            opacity={isHovered ? 1 : 0.85}
          />
        </svg>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';

/**
 * Web Audio Synthesizer — Gyro-Compass Sonar Ping
 * Emits a crisp, futuristic radar chime on interactive click/tap.
 */
function playSonarChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc1.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.18); // E6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    osc2.frequency.exponentialRampToValueAtTime(1975.53, ctx.currentTime + 0.22); // B6

    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.5);
    osc2.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

/**
 * NAVORA AI — Interactive 3D Holographic Gyro-Compass Brand Mark
 * Features:
 * - Magnetic Needle tracking: actively follows pointer angle in real time
 * - Counter-rotating holographic gyro rings with radar calibration ticks
 * - Interactive 360° spin calibration & sonar ping on click/tap
 * - Dual orbiting quantum energy sparks that accelerate on hover
 * - 3D Gyroscope tilt physics
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

  const [needleAngle, setNeedleAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const containerRef = useRef(null);

  // Magnetic needle cursor tracking
  const handlePointerMove = (e) => {
    if (!interactive || !containerRef.current || isCalibrating) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // Angle from center to pointer (0 deg is straight up North)
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI + 90;

    setNeedleAngle(deg);

    // 3D Tilt physics
    const normX = dx / (rect.width / 2);
    const normY = dy / (rect.height / 2);
    setTilt({ x: -(normY * 18), y: normX * 18 });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    // Spring needle back to North with slight natural oscillation
    setNeedleAngle(0);
  };

  const handleTrigger = (e) => {
    if (!interactive) return;

    playSonarChime();
    setPulseKey(prev => prev + 1);
    setIsCalibrating(true);

    // Spin needle 720 degrees for calibration
    setNeedleAngle(prev => prev + 720);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([40, 30, 80]);
    }

    setTimeout(() => {
      setIsCalibrating(false);
      setNeedleAngle(0);
    }, 750);

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={containerRef}
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
      title={interactive ? '✦ Move mouse to guide compass needle · Tap to calibrate' : undefined}
    >
      <style>{`
        @keyframes gyroSpinCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gyroSpinCCW {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes orbitA {
          0% { transform: rotate(0deg) translateX(${dim * 0.46}px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(${dim * 0.46}px) rotate(-360deg); }
        }
        @keyframes orbitB {
          0% { transform: rotate(180deg) translateX(${dim * 0.46}px) rotate(-180deg); }
          100% { transform: rotate(-180deg) translateX(${dim * 0.46}px) rotate(180deg); }
        }
        @keyframes sonarWave {
          0% { transform: scale(0.6); opacity: 0.95; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      {/* 1. Ambient Holographic Glow */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
          style={{
            background: isHovered
              ? 'radial-gradient(circle, rgba(34,211,238,0.7) 0%, rgba(129,140,248,0.45) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(129,140,248,0.2) 50%, transparent 70%)',
            transform: isHovered ? 'scale(1.3)' : 'scale(1.05)',
            filter: 'blur(10px)',
            opacity: 0.8
          }}
        />
      )}

      {/* 2. Sonar Ripple Wave on Click */}
      {isCalibrating && (
        <div
          key={pulseKey}
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400 pointer-events-none"
          style={{ animation: 'sonarWave 0.75s cubic-bezier(0.1, 0.8, 0.2, 1) forwards' }}
        />
      )}

      {/* 3. Orbiting Cyan Quantum Particle */}
      <div
        className="absolute w-2 h-2 rounded-full bg-cyan-300 pointer-events-none z-20"
        style={{
          boxShadow: '0 0 8px #22D3EE, 0 0 14px #22D3EE',
          animation: `orbitA ${isHovered ? '1.8s' : '5.5s'} linear infinite`,
          width: Math.max(3, dim * 0.08),
          height: Math.max(3, dim * 0.08)
        }}
      />

      {/* 4. Orbiting Violet Quantum Particle */}
      <div
        className="absolute w-2 h-2 rounded-full bg-violet-400 pointer-events-none z-20"
        style={{
          boxShadow: '0 0 8px #A855F7, 0 0 14px #7C3AED',
          animation: `orbitB ${isHovered ? '2.2s' : '6.5s'} linear infinite`,
          width: Math.max(3, dim * 0.07),
          height: Math.max(3, dim * 0.07)
        }}
      />

      {/* 5. 3D Tilt Cyber Glass Card Housing */}
      <div
        className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center p-[6%] transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.08 : 1})`,
          background: 'linear-gradient(135deg, rgba(13, 22, 44, 0.94) 0%, rgba(9, 14, 28, 0.98) 100%)',
          border: isHovered ? '1px solid rgba(34, 211, 238, 0.6)' : '1px solid rgba(34, 211, 238, 0.28)',
          boxShadow: isHovered
            ? '0 0 28px rgba(34, 211, 238, 0.35), inset 0 0 16px rgba(34, 211, 238, 0.18)'
            : '0 0 16px rgba(34, 211, 238, 0.14), inset 0 0 8px rgba(34, 211, 238, 0.05)'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Holographic Ring Gradient */}
            <linearGradient id="gyro-ring-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            {/* North Needle Gradient: Electric Cyan */}
            <linearGradient id="needle-north-grad" x1="32" y1="12" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* South Needle Gradient: Neon Purple */}
            <linearGradient id="needle-south-grad" x1="32" y1="32" x2="32" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="70%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            {/* Center Pivot Glow */}
            <radialGradient id="center-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>

            {/* Needle Drop Shadow */}
            <filter id="needle-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22D3EE" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* ── Outer Calibration Ring (Static Radar Ticks) ── */}
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="url(#gyro-ring-grad)"
            strokeWidth="1.2"
            opacity="0.55"
          />

          {/* Cardinal Ticks */}
          <line x1="32" y1="5"  x2="32" y2="9"  stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="55" x2="32" y2="59" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="5"  y1="32" x2="9"  y2="32" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="32" x2="59" y2="32" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />

          {/* Subtle 45° Angle Tick Marks */}
          <line x1="13" y1="13" x2="16" y2="16" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" strokeLinecap="round" />
          <line x1="51" y1="13" x2="48" y2="16" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" strokeLinecap="round" />
          <line x1="13" y1="51" x2="16" y2="48" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" strokeLinecap="round" />
          <line x1="51" y1="51" x2="48" y2="48" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" strokeLinecap="round" />

          {/* ── Mid Gyro Orbit Ring (Counter-Clockwise Spin) ── */}
          <g style={{ transformOrigin: '32px 32px', animation: `gyroSpinCCW ${isHovered ? '4s' : '14s'} linear infinite` }}>
            <circle
              cx="32"
              cy="32"
              r="21.5"
              stroke="#22D3EE"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity={isHovered ? 0.75 : 0.45}
            />
          </g>

          {/* ── Inner Gyro Ring (Clockwise Spin) ── */}
          <g style={{ transformOrigin: '32px 32px', animation: `gyroSpinCW ${isHovered ? '3.5s' : '12s'} linear infinite` }}>
            <circle
              cx="32"
              cy="32"
              r="17"
              stroke="#818CF8"
              strokeWidth="1"
              strokeDasharray="8 6 2 6"
              opacity={isHovered ? 0.8 : 0.4}
            />
          </g>

          {/* ── North "N" Indicator at Apex ── */}
          <text
            x="32"
            y="13"
            textAnchor="middle"
            fill="#38BDF8"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
            opacity="0.85"
            style={{ pointerEvents: 'none' }}
          >
            N
          </text>

          {/* ── INTERACTIVE MAGNETIC NEEDLE (Rotates to follow pointer) ── */}
          <g
            style={{
              transformOrigin: '32px 32px',
              transform: `rotate(${needleAngle}deg)`,
              transition: isCalibrating
                ? 'transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1)'
                : isHovered
                  ? 'transform 0.12s ease-out'
                  : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* North Arrow Blade (Pointing North / Pointer) */}
            <polygon
              points="32,9 35.5,30 32,32 28.5,30"
              fill="url(#needle-north-grad)"
              filter="url(#needle-glow-filter)"
            />

            {/* South Arrow Blade (Opposite / Violet) */}
            <polygon
              points="32,55 28.5,34 32,32 35.5,34"
              fill="url(#needle-south-grad)"
              opacity="0.9"
            />

            {/* Specular Center Seam Reflection */}
            <line
              x1="32"
              y1="10"
              x2="32"
              y2="54"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.75"
            />

            {/* Core Center Pivot Orb */}
            <circle cx="32" cy="32" r="4.5" fill="#0B1120" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="2.5" fill="url(#center-core-glow)" />
            <circle cx="32" cy="32" r="1" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    </div>
  );
}

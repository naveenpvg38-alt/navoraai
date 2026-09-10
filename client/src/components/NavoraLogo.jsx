import React from 'react';

/**
 * NAVORA AI — Official Brand Mark
 * Style: Futuristic Gradient 'N' Emblem
 * A pure, bold, dimensional letter 'N' with origami folds, cyber lighting, and glowing route sparks.
 */
export default function NavoraLogo({ size = 'md', className = '', withGlow = true }) {
  // Map size tokens to pixel dimensions
  const pixelSizes = {
    xs: 22,
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
    '2xl': 84
  };

  const dim = typeof size === 'number' ? size : (pixelSizes[size] || 36);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: dim, height: dim }}
    >
      {/* Outer ambient glow */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl opacity-45 blur-lg pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.6) 0%, rgba(129,140,248,0.4) 50%, transparent 75%)'
          }}
        />
      )}

      <svg
        width={dim}
        height={dim}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Left vertical pillar — Deep Cyan to Ocean Blue */}
          <linearGradient id="n-left-grad" x1="11" y1="8" x2="25" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Right vertical pillar — Electric Indigo to Violet */}
          <linearGradient id="n-right-grad" x1="39" y1="8" x2="53" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          {/* Diagonal Slash Ribbon — Radiant Cyan to Violet Neon */}
          <linearGradient id="n-diag-grad" x1="11" y1="8" x2="53" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Specular sheen highlight */}
          <linearGradient id="n-sheen-grad" x1="11" y1="8" x2="35" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Drop shadow under diagonal ribbon fold */}
          <filter id="n-ribbon-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-2" dy="2" stdDeviation="3" floodColor="#050B17" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* 1. Left Vertical Stem */}
        <rect
          x="11"
          y="8"
          width="14"
          height="48"
          rx="4.5"
          fill="url(#n-left-grad)"
        />

        {/* 2. Right Vertical Stem */}
        <rect
          x="39"
          y="8"
          width="14"
          height="48"
          rx="4.5"
          fill="url(#n-right-grad)"
        />

        {/* 3. Diagonal Fold Ribbon (Overlays Pillars) */}
        <path
          d="M 11 12.5 C 11 10 13 8 15.5 8 L 24.5 8 C 25.8 8 27.2 8.8 28 9.9 L 52.5 50.8 C 53.5 52.4 52.6 54.6 50.7 55.4 C 49.9 55.8 49 56 48.2 56 L 39.5 56 C 38.2 56 36.8 55.2 36 54.1 L 11.5 13.2 C 11.2 12.8 11 12.2 11 11.5 Z"
          fill="url(#n-diag-grad)"
          filter="url(#n-ribbon-shadow)"
        />

        {/* 4. Specular Highlight Blade Edge */}
        <path
          d="M 12 11 C 12 9.5 13.5 8.5 15.5 8.5 L 23 8.5 L 34 25 L 28 26 Z"
          fill="url(#n-sheen-grad)"
          opacity="0.8"
        />

        {/* 5. Top-Left Origin Node (AI spark) */}
        <circle cx="18" cy="14" r="2.2" fill="#FFFFFF" />
        <circle cx="18" cy="14" r="4.5" fill="#38BDF8" opacity="0.35" />

        {/* 6. Bottom-Right Destination Node (Route end) */}
        <circle cx="46" cy="50" r="2.2" fill="#FFFFFF" />
        <circle cx="46" cy="50" r="4.5" fill="#C084FC" opacity="0.35" />

        {/* 7. Center Crossroads Navigation Diamond */}
        <polygon
          points="32,29.5 34.5,32 32,34.5 29.5,32"
          fill="#FFFFFF"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}

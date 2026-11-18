import React from 'react';

/**
 * Geometric Phantom Mask / Emblem SVG
 * The signature builder emblem for Shyam Sunder Sharma ("The Phantom")
 */
export const PhantomIcon = ({ className = "w-6 h-6", glow = false }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${glow ? 'group' : ''}`}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 ${className} transition-transform duration-300 group-hover:scale-105`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="phantomStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="phantomFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#111827" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield Outline */}
        <polygon
          points="50,8 88,28 88,72 50,92 12,72 12,28"
          stroke="url(#phantomStroke)"
          strokeWidth="3.5"
          fill="url(#phantomFill)"
          strokeLinejoin="round"
        />

        {/* Inner Mask Facet Plate */}
        <polygon
          points="50,18 78,34 78,66 50,82 22,66 22,34"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          fill="#090d16"
        />

        {/* Cyber Forehead Notch */}
        <path
          d="M42,20 L50,30 L58,20"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sleek Phantom Eye Slits */}
        <polygon
          points="28,46 44,50 34,54"
          fill="url(#eyeGlow)"
        />
        <polygon
          points="72,46 56,50 66,54"
          fill="url(#eyeGlow)"
        />

        {/* Angular Cheekbone Cuts */}
        <line x1="28" y1="58" x2="42" y2="68" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="58" x2="58" y2="68" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />

        {/* Core Power Node */}
        <circle cx="50" cy="58" r="3.5" fill="#10b981" />
        <circle cx="50" cy="58" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
};

export default PhantomIcon;

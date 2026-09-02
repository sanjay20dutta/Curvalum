import React from 'react';

interface CurvalumLogoProps {
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const CurvalumLogo: React.FC<CurvalumLogoProps> = ({
  variant = 'dark',
  showTagline = true,
  size = 'md',
  className = '',
  onClick,
}) => {
  const isDarkBg = variant === 'white' || variant === 'light';
  
  const sizeMap = {
    sm: { icon: 32, title: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 40, title: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 52, title: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 64, title: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group transition-transform ${className}`}
    >
      {/* Precision Vector Emblem matching brochure geometric curve */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
            <linearGradient id="silverGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Geometric Triangle Frame */}
          <polygon
            points="50,6 94,84 6,84"
            fill="none"
            stroke="url(#silverGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="opacity-80"
          />

          {/* Stylized Interlocking C-Curve & V Architectural Wing */}
          <path
            d="M 32 45 C 32 30, 48 24, 60 28 C 70 32, 72 44, 64 54 C 54 66, 36 68, 28 60 C 22 54, 22 42, 34 35"
            fill="none"
            stroke="url(#metalGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M 44 38 L 62 76 L 86 28"
            fill="none"
            stroke={isDarkBg ? '#ffffff' : '#0f172a'}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Accent node */}
          <circle cx="62" cy="76" r="3" fill="#4f46e5" />
        </svg>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-black tracking-[0.14em] leading-tight ${currentSize.title} ${
            isDarkBg ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          CURVALUM
        </span>

        {showTagline && (
          <span
            className={`font-medium tracking-wide ${currentSize.sub} ${
              isDarkBg ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Curve System Aluminium windows and doors
          </span>
        )}
      </div>
    </div>
  );
};

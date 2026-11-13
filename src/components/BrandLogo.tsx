import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact' | 'monogram-only';
  className?: string;
  useImage?: boolean;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  useImage = false,
  inverted = false,
}) => {
  const heights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
  };

  const monogramSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm lg:text-base tracking-[0.14em]',
    lg: 'text-xl tracking-[0.16em]',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
  };

  // If using uploaded image directly:
  if (useImage) {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <img
          src="/assets/aistudio/image_923c37fc.png"
          alt="Main Stay Hotel Logo"
          className={`${heights[size]} w-auto object-contain`}
        />
      </div>
    );
  }

  // Vector render matching the exact uploaded mark
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* M Monogram with architectural silver fold */}
      <div className={`relative ${monogramSizes[size]} shrink-0 flex items-center justify-center`} aria-hidden="true">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Vertical Pillar - Solid Black */}
          <rect x="8" y="10" width="16" height="80" fill="#111111" />
          
          {/* Left Diagonal - Solid Black */}
          <path d="M24 10L50 62L40 76L16 28V10H24Z" fill="#111111" />

          {/* Right Diagonal - Architectural Cool Silver Facet */}
          <path d="M50 62L76 10H64L42 54L50 62Z" fill="#D9D9D9" />
          
          {/* Right Vertical Pillar - Solid Black */}
          <rect x="76" y="10" width="16" height="80" fill="#111111" />
        </svg>
      </div>

      {variant !== 'monogram-only' && (
        <div className="flex flex-col justify-center leading-tight">
          <span className={`font-heading font-extrabold text-[#111111] uppercase whitespace-nowrap ${textSizes[size]}`}>
            MAIN STAY HOTEL
          </span>
          <span className={`font-sans font-semibold text-[#6B6B6B] uppercase whitespace-nowrap ${subSizes[size]}`}>
            Modern 5-Star Luxury
          </span>
        </div>
      )}
    </div>
  );
};

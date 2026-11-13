import React from 'react';
import logoDark from '../assets/images/mainstay-logo.png';
import logoLight from '../assets/images/mainstay-logo-light.png';

interface OmbaraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  inverted?: boolean;
  className?: string;
  showText?: boolean;
}

// Main Stay Hotel logo (transparent PNGs generated from "LOGO MAIN MSTAY.jpg").
// `inverted` renders the white/silver version for dark backgrounds.
export const OmbaraLogo: React.FC<OmbaraLogoProps> = ({
  size = 'md',
  inverted = false,
  className = '',
}) => {
  const heights = {
    sm: 'h-9',
    md: 'h-16',
    lg: 'h-20',
    hero: 'h-32 sm:h-40 lg:h-48',
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={inverted ? logoLight : logoDark}
        alt="Main Stay Hotel"
        className={`${heights[size]} w-auto object-contain`}
        draggable={false}
      />
    </div>
  );
};

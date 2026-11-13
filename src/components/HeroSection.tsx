import React from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface HeroSectionProps {
  onReserveClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onReserveClick,
  onExploreClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
      aria-label="Welcome to Main Stay Hotel"
    >
      {/* Contemporary Architectural Exterior with Soft Light Scrim */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/src/assets/images/hero_hotel_exterior_1793344934653.jpg"
          alt="Main Stay Hotel contemporary architectural facade"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Soft, modern daylight gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-[#FAFAFA]/45" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-28 text-center flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 bg-white/90 border border-[#D9D9D9] shadow-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#111111]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-bold">
            Main Stay Hotel · Modern 5-Star Experience
          </span>
        </div>

        {/* Display Headline with Modern Bold Sans */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.08] max-w-4xl text-balance">
          Where Modern Precision Meets <br className="hidden sm:inline" />
          <span className="text-[#111111]">Metropolitan Luxury.</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#4D4D4D] font-normal max-w-2xl leading-relaxed text-balance">
          Discover a contemporary architectural haven designed for elevated living. Soundproof skyline suites, two-Michelin-starred dining, and intuitive 24/7 guest services.
        </p>

        {/* Modern Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.18em] font-bold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-lg shadow-neutral-900/20 flex items-center justify-center gap-2"
          >
            <span>Reserve Your Stay</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.18em] font-bold text-[#111111] hover:text-[#111111] bg-white hover:bg-slate-50 border border-[#D9D9D9] transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>Explore Residences</span>
          </button>
        </div>

        {/* Modern Trust Signals Strip */}
        <div className="mt-14 pt-8 border-t border-[#E6E6E6] flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-[#6B6B6B] font-medium">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#111111]" />
            <span className="text-[#111111] font-semibold">Forbes 5-Star Awarded</span>
          </div>
          <span className="text-[#D9D9D9]">·</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <span className="text-[#111111] font-semibold">2 Michelin Stars (Cobalt & Oak)</span>
          </div>
          <span className="text-[#D9D9D9]">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#111111]" />
            <span>Guaranteed Best Direct Rates</span>
          </div>
        </div>
      </div>

      {/* Discreet Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-75 hover:opacity-100 transition-opacity">
        <button
          onClick={onExploreClick}
          aria-label="Scroll to introduction"
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B] font-semibold cursor-pointer"
        >
          <span>Discover</span>
          <ChevronDown className="w-4 h-4 text-[#111111] animate-bounce" />
        </button>
      </div>
    </section>
  );
};

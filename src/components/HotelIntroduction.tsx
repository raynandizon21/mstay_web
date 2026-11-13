import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Award } from 'lucide-react';

interface HotelIntroductionProps {
  onExplorePhilosophy: () => void;
  onExploreSuites: () => void;
}

export const HotelIntroduction: React.FC<HotelIntroductionProps> = ({
  onExplorePhilosophy,
  onExploreSuites,
}) => {
  return (
    <section
      id="introduction"
      className="py-24 lg:py-32 bg-white text-[#111111] relative overflow-hidden border-b border-[#E6E6E6]"
      aria-label="Hotel Philosophy"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Modern Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-[2px] bg-[#111111]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-bold">
            The Philosophy · Modern Hospitality
          </span>
        </div>

        {/* Two-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Core Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111111] leading-[1.12] tracking-tight text-balance">
              Designed For The <br />
              <span className="text-[#111111]">Modern Connoisseur.</span>
            </h2>

            <p className="text-base text-[#4D4D4D] font-normal leading-relaxed">
              Rising at the nexus of the metropolitan financial and cultural district, Main Stay Hotel is conceived as an architectural oasis for today’s global traveler. Here, clean geometric lines, tactile natural stones, and intuitive smart technologies converge.
            </p>

            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Every space is calibrated for acoustic tranquility and effortless comfort. From two-Michelin-starred cuisine at Cobalt & Oak to our rooftop vitality pool, discover a stay crafted around your personal rhythm.
            </p>

            <div className="pt-2">
              <button
                onClick={onExplorePhilosophy}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold text-[#111111] hover:text-[#3A3A3A] transition-colors cursor-pointer group"
              >
                <span>Discover Architectural Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Image & 3 Modern Pillar Cards */}
          <div className="lg:col-span-7 space-y-8">
            {/* Visual Container */}
            <div className="relative overflow-hidden rounded-sm border border-[#E6E6E6] shadow-md group">
              <div className="aspect-[16/10] overflow-hidden bg-[#F2F2F2]">
                <img
                  src="/src/assets/images/hero_hotel_exterior_1793344934653.jpg"
                  alt="Main Stay Hotel grand architectural entrance"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#E6E6E6] flex items-center justify-between text-xs text-[#6B6B6B]">
                <span className="font-semibold text-[#111111]">Grand Portico & Double-Height Atrium</span>
                <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">100 Grand Boulevard</span>
              </div>
            </div>

            {/* 3 Modern Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#FAFAFA] border border-[#E6E6E6] rounded-xs hover:border-[#111111]/40 transition-colors space-y-2">
                <div className="w-8 h-8 rounded-xs bg-[#F2F2F2] flex items-center justify-center text-[#111111]">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-heading text-sm font-bold text-[#111111]">
                  Acoustic Sanctuary
                </h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Triple-glazed acoustic facade ensuring deep quiet above the city avenues.
                </p>
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#E6E6E6] rounded-xs hover:border-[#111111]/40 transition-colors space-y-2">
                <div className="w-8 h-8 rounded-xs bg-[#F2F2F2] flex items-center justify-center text-[#111111]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-heading text-sm font-bold text-[#111111]">
                  Resident Butler Service
                </h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Discreet, certified valets attentive to your schedule and preferences.
                </p>
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#E6E6E6] rounded-xs hover:border-[#111111]/40 transition-colors space-y-2">
                <div className="w-8 h-8 rounded-xs bg-[#F2F2F2] flex items-center justify-center text-[#111111]">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-heading text-sm font-bold text-[#111111]">
                  Michelin Gastronomy
                </h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Two Michelin stars at Cobalt & Oak paired with 2,000+ cellar vintages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

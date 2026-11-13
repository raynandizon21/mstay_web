import React from 'react';
import { ArrowRight, Waves, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { WELLNESS_FACILITIES } from '../data/hotelData.ts';

interface WellnessSectionProps {
  onBookSpa: () => void;
}

export const WellnessSection: React.FC<WellnessSectionProps> = ({ onBookSpa }) => {
  return (
    <section
      id="wellness"
      className="py-24 lg:py-32 bg-[#FAFAFA] text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Wellness and Spa"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#E6E6E6]">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#111111]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-bold">
                Restoration & Vitality
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
              A Modern Sanctuary For <span className="text-[#111111]">Mind & Body.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B6B] font-normal leading-relaxed max-w-xl">
              Restore your sense of equilibrium through heated skyline hydrotherapy, peaceful architectural recovery suites, and personalized wellness rituals.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={onBookSpa}
              className="px-6 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-md inline-flex items-center gap-2 rounded-xs"
            >
              <span>Inquire Spa Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Feature Visual */}
        <div className="mt-12 relative overflow-hidden bg-white border border-[#E6E6E6] shadow-sm rounded-xs group">
          <div className="aspect-[21/9] sm:aspect-[16/7] overflow-hidden">
            <img
              src="/src/assets/images/wellness_spa_pool_1793344936990.jpg"
              alt="Main Stay Hotel skyline hydrotherapy vitality pool"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="p-6 bg-white border-t border-[#E6E6E6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#111111] font-bold block mb-1">
                Thermal Hydrotherapy Suite
              </span>
              <h3 className="font-heading text-xl sm:text-2xl text-[#111111] font-bold">
                Skyline Mineral Vitality Pool & Steam Chambers
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md font-normal">
              Maintained at an optimal 36°C with hydro-kinetic massage jets for complete physical recovery and renewal.
            </p>
          </div>
        </div>

        {/* 4 Minimalist Facilities Cards with Modern Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {WELLNESS_FACILITIES.map((facility) => {
            const icons = {
              Waves: <Waves className="w-5 h-5 text-[#111111]" />,
              Sparkles: <Sparkles className="w-5 h-5 text-[#111111]" />,
              Activity: <Activity className="w-5 h-5 text-[#111111]" />,
              ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#111111]" />,
            };

            return (
              <div
                key={facility.id}
                className="p-6 bg-white border border-[#E6E6E6] rounded-xs shadow-xs hover:border-[#111111]/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xs bg-[#F5F5F5] flex items-center justify-center">
                    {icons[facility.iconName as keyof typeof icons] || (
                      <Sparkles className="w-5 h-5 text-[#111111]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#111111] font-bold block">
                      {facility.subtitle}
                    </span>
                    <h4 className="font-heading text-base font-bold text-[#111111] mt-0.5">
                      {facility.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="text-[11px] text-[#A3A3A3] font-medium pt-3 mt-4 border-t border-[#F2F2F2]">
                  {facility.hours}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

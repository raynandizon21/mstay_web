import React from 'react';
import { ArrowRight, Clock, Check } from 'lucide-react';
import { EXPERIENCES, Experience } from '../data/hotelData.ts';

interface ExperiencesSectionProps {
  onInquireExperience: (experience: Experience) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  onInquireExperience,
}) => {
  return (
    <section
      id="experiences"
      className="py-24 lg:py-32 bg-white text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Hotel Experiences"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#111111]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-bold">
              Bespoke Curation
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Curated Experiences, <span className="text-[#111111]">Unrivaled Memories.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B] font-normal leading-relaxed">
            Curated private excursions, sommelier masterclasses, and tailored metropolitan itineraries coordinated by our Chief Concierge.
          </p>
        </div>

        {/* 3 Experiences Cards on Clean White */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="group flex flex-col justify-between border border-[#E6E6E6] bg-[#FAFAFA] rounded-xs hover:border-[#111111]/40 transition-all duration-300 shadow-xs hover:shadow-md overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#E6E6E6]">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#111111] font-bold shadow-xs rounded-xs">
                  {exp.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#111111] mb-2 group-hover:text-[#111111] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-normal leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="text-xs text-[#4D4D4D] py-3 border-t border-[#F2F2F2] space-y-1.5 font-medium">
                    <div className="flex items-center gap-1.5 text-[#111111]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duration: {exp.duration}</span>
                    </div>
                    <div className="text-[11px] text-[#6B6B6B]">{exp.inclusions}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2F2F2]">
                  <button
                    onClick={() => onInquireExperience(exp)}
                    className="w-full py-2.5 text-xs uppercase tracking-wider font-bold text-white hover:text-white bg-[#F2F2F2] hover:bg-[#111111] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 rounded-xs"
                  >
                    <span>Inquire with Concierge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

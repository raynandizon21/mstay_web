import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/hotelData.ts';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-[#FAFAFA] text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Guest Testimonials"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E6E6E6] shadow-xs mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
            Guest Testimonials
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl text-[#111111] font-bold tracking-tight mb-12">
          Reflections from Our <span className="text-[#111111]">Distinguished Guests.</span>
        </h2>

        {/* Modern Editorial Quote Card */}
        <div className="relative py-10 bg-white border border-[#E6E6E6] p-8 sm:p-12 shadow-sm rounded-xs">
          <div className="text-4xl text-[#111111]/20 font-serif leading-none mb-3">“</div>
          <blockquote className="font-heading text-xl sm:text-2xl text-[#111111] font-normal leading-relaxed max-w-2xl mx-auto text-balance">
            {current.quote}
          </blockquote>

          {/* Attributions */}
          <div className="mt-8 pt-6 border-t border-[#F2F2F2] space-y-1.5">
            <span className="font-heading text-base text-[#111111] font-bold block">
              {current.guestName}
            </span>
            <div className="text-xs text-[#6B6B6B] font-normal flex items-center justify-center gap-2 flex-wrap">
              <span>{current.residence}</span>
              <span className="text-[#D9D9D9]">·</span>
              <span className="text-[#111111] font-medium">{current.suiteType}</span>
              <span className="text-[#D9D9D9]">·</span>
              <span className="px-2 py-0.5 bg-[#F2F2F2] text-[#4D4D4D] font-medium text-[10px]">
                {current.source}
              </span>
            </div>
          </div>
        </div>

        {/* Understated Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-2 text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-[3px] rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#111111]' : 'w-3 bg-[#D9D9D9]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

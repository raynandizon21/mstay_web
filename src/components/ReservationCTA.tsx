import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface ReservationCTAProps {
  onReserveClick: () => void;
  onContactConcierge: () => void;
}

export const ReservationCTA: React.FC<ReservationCTAProps> = ({
  onReserveClick,
  onContactConcierge,
}) => {
  return (
    <section
      id="reserve-cta"
      className="relative py-28 lg:py-36 bg-[#FAFAFA] text-[#111111] overflow-hidden border-t border-[#E6E6E6]"
      aria-label="Reserve Your Stay"
    >
      {/* Background Photography with Modern Light Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/room_deluxe_suite_1793344935471.jpg"
          alt="Main Stay Hotel twilight suite"
          className="w-full h-full object-cover object-center scale-102 opacity-25"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/95 to-[#FAFAFA]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E6E6E6] shadow-xs mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
            Bespoke Hospitality
          </span>
        </div>

        <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight max-w-2xl leading-[1.1] text-balance">
          Elevate Your Stay with <br />
          <span className="text-[#111111]">Main Stay Hotel.</span>
        </h2>

        <p className="mt-6 text-sm sm:text-base text-[#4D4D4D] font-normal max-w-lg leading-relaxed text-balance">
          Discover a contemporary urban sanctuary where thoughtful architecture, Michelin-starred dining, and individualized resident service meet.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-9 py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Reserve Your Stay</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactConcierge}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#111111] hover:text-[#111111] bg-white hover:bg-[#FAFAFA] border border-[#D9D9D9] transition-all duration-300 cursor-pointer shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#111111]" />
            <span>Contact Concierge Desk</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="mt-12 pt-8 border-t border-[#E6E6E6] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#6B6B6B] font-normal">
          <span className="font-semibold text-[#111111]">Best Direct Rate Guarantee</span>
          <span className="text-[#D9D9D9]">·</span>
          <span>Complimentary Gigabit Wi-Fi</span>
          <span className="text-[#D9D9D9]">·</span>
          <span>Flexible 48-Hour Cancellation</span>
        </div>
      </div>
    </section>
  );
};

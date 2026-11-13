import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OFFERS, ExclusiveOffer } from '../data/hotelData.ts';

interface OffersSectionProps {
  onSelectOffer: (offer: ExclusiveOffer) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onSelectOffer }) => {
  return (
    <section
      id="offers"
      className="py-24 lg:py-32 bg-white text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Exclusive Offers"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] border border-[#E6E6E6] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
              Curated Privileges
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-bold tracking-tight">
            Exclusive <span className="text-[#111111]">Packages.</span>
          </h2>
          <p className="text-sm text-[#6B6B6B] font-normal leading-relaxed">
            Elevate your stay with signature dining tastings, private electric transfers, and bespoke wellness treatments.
          </p>
        </div>

        {/* 3 Offers Grid on Clean White */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OFFERS.map((offer) => (
            <article
              key={offer.id}
              className="group flex flex-col justify-between border border-[#E6E6E6] bg-white hover:border-[#111111] transition-all duration-300 shadow-xs hover:shadow-xl rounded-xs overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F2F2]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#111111]/90 text-white px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold shadow-xs">
                  {offer.label}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 border border-[#E6E6E6] text-xs shadow-xs">
                  <span className="font-heading text-[#111111] font-bold text-sm tabular-nums">
                    ${offer.startingFrom}
                  </span>
                  <span className="text-[#6B6B6B] text-[10px]"> / night</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl text-[#111111] font-bold mb-2 group-hover:text-[#111111] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-normal leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <ul className="text-xs text-[#4D4D4D] font-normal space-y-1.5 py-3 border-t border-[#F2F2F2]">
                    {offer.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#111111] shrink-0 font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F2F2F2] mt-4">
                  <button
                    onClick={() => onSelectOffer(offer)}
                    className="w-full py-2.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-[#A3A3A3] text-center mt-2 font-normal">
                    {offer.terms}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

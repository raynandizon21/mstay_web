import React, { useState } from 'react';
import { Calendar, UtensilsCrossed, Wine, Clock, Sparkles } from 'lucide-react';
import { DINING_VENUES, DiningVenue } from '../data/hotelData.ts';

interface DiningSectionProps {
  onReserveTable: (venue: DiningVenue) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onReserveTable }) => {
  const [activeVenue, setActiveVenue] = useState<DiningVenue>(DINING_VENUES[0]);

  return (
    <section
      id="dining"
      className="py-24 lg:py-32 bg-white text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Signature Dining"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#111111]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-bold">
              Culinary Artistry
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            An Invitation to <span className="text-[#111111]">Extraordinary Taste.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B] font-normal leading-relaxed">
            Thoughtfully sourced ingredients, inspired culinary techniques, and exceptional sommelier pairings define every dining experience at Main Stay Hotel.
          </p>
        </div>

        {/* Modern Venue Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-[#F2F2F2] rounded-xs border border-[#E6E6E6] mb-10 overflow-x-auto w-fit">
          {DINING_VENUES.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setActiveVenue(venue)}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-bold transition-all rounded-xs cursor-pointer whitespace-nowrap ${
                activeVenue.id === venue.id
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {venue.name}
            </button>
          ))}
        </div>

        {/* Active Venue Spotlight: Editorial Two-Column on Clean Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FAFAFA] border border-[#E6E6E6] p-6 sm:p-10 shadow-sm rounded-xs">
          {/* Visual Showcase */}
          <div className="lg:col-span-7 relative overflow-hidden bg-[#E6E6E6] rounded-xs border border-[#E6E6E6] shadow-xs group">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={activeVenue.image}
                alt={activeVenue.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="p-3 bg-white border-t border-[#E6E6E6] flex items-center justify-between text-xs text-[#111111]">
              <span className="font-heading font-semibold text-[#111111]">
                {activeVenue.subtitle}
              </span>
              <span className="text-[11px] text-[#6B6B6B] uppercase tracking-wider font-bold">
                {activeVenue.cuisine}
              </span>
            </div>
          </div>

          {/* Details Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#111111] font-bold block mb-1">
                {activeVenue.cuisine}
              </span>
              <h3 className="font-heading text-3xl font-bold text-[#111111]">
                {activeVenue.name}
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1 font-medium">
                Led by {activeVenue.chef}
              </p>
            </div>

            <p className="text-sm text-[#4D4D4D] leading-relaxed font-normal">
              {activeVenue.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#E6E6E6] text-xs text-[#6B6B6B]">
              <div className="flex items-start gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#111111] text-[10px] uppercase tracking-wider block font-bold">
                    Signature Creation
                  </span>
                  <span className="text-[#111111] font-medium">{activeVenue.signatureDish}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Wine className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#111111] text-[10px] uppercase tracking-wider block font-bold">
                    Cellar Selection
                  </span>
                  <span className="text-[#111111] font-medium">{activeVenue.cellarHighlight}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E6E6E6]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#111111]" />
                  <span>{activeVenue.hours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                  <span>{activeVenue.dressCode}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onReserveTable(activeVenue)}
                className="w-full sm:w-auto px-7 py-3 text-xs uppercase tracking-[0.16em] font-bold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve A Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

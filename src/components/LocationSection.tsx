import React, { useState } from 'react';
import { MapPin, Navigation, Car, Clock, ExternalLink } from 'lucide-react';
import { HOTEL_LOCATION } from '../data/hotelData.ts';

export const LocationSection: React.FC = () => {
  const [selectedLandmark, setSelectedLandmark] = useState<number>(0);

  return (
    <section
      id="location"
      className="py-24 lg:py-32 bg-white text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Hotel Location"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#E6E6E6]">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] border border-[#E6E6E6] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                Prime Urban Address
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-bold tracking-tight">
              At the Epicenter of <br className="hidden sm:inline" />
              <span className="text-[#111111]">Urban Life & Culture.</span>
            </h2>
            <p className="text-sm text-[#6B6B6B] max-w-lg font-normal leading-relaxed">
              Anchored at 100 Grand Boulevard, placing metropolitan galleries, high-fashion flagships, and prime corporate headquarters within effortless reach.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col lg:items-end text-xs text-[#6B6B6B] font-normal">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#111111]" />
              <span className="text-[#111111] font-semibold">{HOTEL_LOCATION.address}</span>
            </div>
            <span className="mt-1">{HOTEL_LOCATION.city}</span>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-stretch">
          {/* Landmarks Accordion */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold block mb-3">
                Key Destinations & Transit Times
              </span>

              {HOTEL_LOCATION.landmarks.map((landmark, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLandmark(idx)}
                  className={`w-full text-left p-4 border transition-all cursor-pointer flex items-center justify-between bg-[#FAFAFA] ${
                    selectedLandmark === idx
                      ? 'border-[#111111] bg-white shadow-sm ring-1 ring-[#111111]/20'
                      : 'border-[#E6E6E6] hover:border-[#A3A3A3]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-[#111111] font-semibold block">
                      {landmark.category}
                    </span>
                    <span className="font-heading text-base text-[#111111] font-medium block">
                      {landmark.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] font-mono shrink-0">
                    <Clock className="w-3 h-3 text-[#111111]" />
                    <span>{landmark.distance}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Chauffeur Service Note */}
            <div className="p-4 bg-[#FAFAFA] border border-[#E6E6E6] space-y-1.5 mt-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#111111] font-semibold uppercase tracking-wider">
                <Car className="w-3.5 h-3.5 text-[#111111]" />
                <span>Executive Electric & Hybrid Fleet</span>
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-normal">
                Complimentary airport transfers in our dedicated fleet of custom Lucid & BMW i7 limousines for all Suite and Penthouse guests.
              </p>
            </div>
          </div>

          {/* Right Stylized Minimalist Light Map Viewport */}
          <div className="lg:col-span-7 bg-white border border-[#E6E6E6] relative overflow-hidden flex flex-col min-h-[400px] shadow-sm">
            {/* Minimalist Light Map Canvas */}
            <div className="relative flex-1 bg-[#FAFAFA] p-8 flex items-center justify-center overflow-hidden">
              {/* Hairline Grid */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #E6E6E6 1px, transparent 1px),
                    linear-gradient(to bottom, #E6E6E6 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Major Avenues */}
              <div className="absolute w-full h-[2px] bg-[#A3A3A3]/30 top-1/2 -translate-y-1/2" />
              <div className="absolute h-full w-[2px] bg-[#111111]/25 left-1/2 -translate-x-1/2" />

              {/* Center Pin */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center shadow-lg">
                  <div className="flex items-center justify-center">
                    <span className="font-heading font-black text-base text-[#111111] tracking-tighter">
                      M<span className="text-[#111111]">S</span>
                    </span>
                  </div>
                </div>
                <div className="mt-2 px-3 py-1 bg-white border border-[#E6E6E6] text-center shadow-md">
                  <span className="text-xs font-heading font-bold text-[#111111] block">
                    Main Stay Hotel
                  </span>
                  <span className="text-[8px] text-[#111111] font-semibold uppercase tracking-wider block">
                    100 Grand Boulevard
                  </span>
                </div>
              </div>

              {/* Surrounding Landmark Markers */}
              <div className="absolute top-10 left-10 p-2 bg-white border border-[#E6E6E6] text-[10px] text-[#333333] shadow-xs">
                <span className="text-[#111111] font-bold">·</span> Modern Art Pavilion (3 min)
              </div>
              <div className="absolute bottom-10 right-10 p-2 bg-white border border-[#E6E6E6] text-[10px] text-[#333333] shadow-xs">
                <span className="text-[#111111] font-bold">·</span> Luxury Avenue (1 min)
              </div>
              <div className="absolute top-12 right-12 p-2 bg-white border border-[#E6E6E6] text-[10px] text-[#333333] shadow-xs">
                <span className="text-[#111111] font-bold">·</span> Global Financial Tower (6 min)
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-3.5 bg-white border-t border-[#E6E6E6] flex items-center justify-between text-xs text-[#6B6B6B] font-normal">
              <span>Coordinates: 40.7580° N, 73.9855° W</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#3A3A3A] transition-colors font-semibold"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

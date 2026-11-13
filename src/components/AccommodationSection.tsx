import React, { useState } from 'react';
import { ArrowRight, Maximize2, Users, Bed, Check } from 'lucide-react';
import { ROOMS, Room } from '../data/hotelData.ts';

interface AccommodationSectionProps {
  onSelectRoom: (room: Room) => void;
  onExploreRoom: (room: Room) => void;
}

export const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  onSelectRoom,
  onExploreRoom,
}) => {
  const [filter, setFilter] = useState<'all' | 'suite' | 'room' | 'penthouse'>('all');

  const filteredRooms =
    filter === 'all' ? ROOMS : ROOMS.filter((r) => r.category === filter);

  return (
    <section
      id="accommodation"
      className="py-24 lg:py-32 bg-[#FAFAFA] text-[#111111] relative"
      aria-label="Rooms and Suites"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E6E6E6]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#111111]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-bold">
                The Residences
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
              Spaces Designed For <span className="text-[#111111]">Extraordinary Living.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B6B] max-w-xl font-normal leading-relaxed">
              Curated private sanctuaries featuring soundproof acoustic glazing, bespoke Italian textiles, and panoramic skyline vistas.
            </p>
          </div>

          {/* Modern Filter Tabs */}
          <div className="flex items-center gap-2 bg-white p-1.5 border border-[#E6E6E6] rounded-xs shadow-xs shrink-0 overflow-x-auto">
            {[
              { id: 'all', label: 'All Residences' },
              { id: 'suite', label: 'Suites' },
              { id: 'room', label: 'Studios' },
              { id: 'penthouse', label: 'Penthouse' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accommodations Modern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              className="group flex flex-col justify-between border border-[#E6E6E6] bg-white rounded-xs hover:border-[#111111]/40 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden"
            >
              {/* Photo Viewport */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F2F2]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Price Pill */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 border border-[#E6E6E6] shadow-sm rounded-xs text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-medium block">Starting from</span>
                  <span className="font-heading text-base font-bold text-[#111111] tabular-nums">
                    ${room.startingPriceUsd}
                  </span>
                  <span className="text-[10px] text-[#6B6B6B] font-normal"> / night</span>
                </div>

                {/* Location Inset */}
                <div className="absolute bottom-3 left-4 text-xs text-white drop-shadow-md font-medium">
                  <span>{room.floor}</span>
                  <span className="mx-2 text-white/60">·</span>
                  <span>{room.view}</span>
                </div>
              </div>

              {/* Information */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#111111] font-bold mb-1">
                    {room.tagline}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#111111] mb-3">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] font-normal leading-relaxed mb-6">
                    {room.description}
                  </p>

                  {/* Clean Technical Specifications */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F2F2F2] text-xs text-[#333333] font-medium mb-6">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                      <span className="tabular-nums">{room.sizeSqM} m² / {room.sizeSqFt} ft²</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                      <span>{room.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Bed className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                      <span className="truncate">King Bed</span>
                    </div>
                  </div>

                  {/* Key Inclusions */}
                  <div className="space-y-1.5 mb-6">
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                        <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectRoom(room)}
                    className="flex-1 py-3 text-xs uppercase tracking-[0.16em] font-bold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 text-center cursor-pointer shadow-sm rounded-xs"
                  >
                    Reserve Residence
                  </button>

                  <button
                    onClick={() => onExploreRoom(room)}
                    className="px-5 py-3 text-xs uppercase tracking-[0.16em] font-bold text-[#111111] hover:text-[#111111] bg-white border border-[#D9D9D9] hover:border-[#111111] transition-colors cursor-pointer flex items-center gap-1.5 rounded-xs"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
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

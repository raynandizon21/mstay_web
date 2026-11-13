import React, { useState } from 'react';
import {
  AirVent,
  ArrowUpRight,
  BedDouble,
  ChevronDown,
  CookingPot,
  LockKeyhole,
  Tv,
  Users,
  WashingMachine,
  Wifi,
} from 'lucide-react';
import { RESIDENCES_DATA, ResidenceItem } from '../data/ombaraData.ts';
import { Reveal } from './Reveal.tsx';

interface OmbaraResidencesProps {
  onSelectResidence?: (residence: ResidenceItem) => void;
}

// Highlights shown on every card; the full list sits behind "All amenities"
const KEY_AMENITIES = [
  { label: 'Wi-Fi', icon: Wifi },
  { label: 'LED TV', icon: Tv },
  { label: 'Air Con', icon: AirVent },
  { label: 'Kitchenette', icon: CookingPot },
  { label: 'Washer', icon: WashingMachine },
  { label: 'Safe', icon: LockKeyhole },
];

const RoomCard: React.FC<{ room: ResidenceItem; onSelect?: (room: ResidenceItem) => void }> = ({ room, onSelect }) => {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const current = room.images[active] ?? room.images[0];

  return (
    <article className="group rounded-3xl border border-[#E6E6E6] bg-white p-2.5 hover:shadow-luxury-card hover:border-transparent transition-all duration-500 h-full flex flex-col">
      {/* Main photo */}
      <div className="relative aspect-video rounded-[18px] overflow-hidden bg-[#EDEDED]">
        {room.images.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img.src}
              alt={`${room.title} — ${img.caption}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]">
          {room.label}
        </span>
        <span
          key={current.caption}
          className="animate-rise absolute bottom-4 left-4 rounded-full bg-black/45 backdrop-blur-md px-3 py-1 text-xs text-white"
        >
          {current.caption}
        </span>
      </div>

      {/* Photo strip — one compact row */}
      <div className="mt-2 flex gap-1.5 overflow-x-auto no-scrollbar">
        {room.images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setActive(idx)}
            aria-label={`Show ${img.caption}`}
            aria-current={idx === active}
            className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              idx === active ? 'ring-2 ring-[#111111] ring-offset-1' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Details */}
      <div className="px-4 sm:px-5 pt-6 pb-4 flex-1 flex flex-col">
        <h3 className="font-serif-luxury text-2xl sm:text-[28px] font-medium">{room.title}</h3>

        {/* Bed & occupancy — one line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-[#6B6B6B]">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="w-4 h-4" strokeWidth={1.5} /> {room.bed}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4" strokeWidth={1.5} />
            {room.standardOccupancy === room.maxOccupancy
              ? `${room.maxOccupancy} guests`
              : `${room.standardOccupancy} guests · max ${room.maxOccupancy}`}
          </span>
        </div>

        <p className="text-sm text-[#6B6B6B] leading-relaxed mt-4">{room.description}</p>

        {/* Key amenities */}
        <ul className="grid grid-cols-3 gap-y-3 gap-x-2 mt-6 pt-5 border-t border-[#EDEDED]">
          {KEY_AMENITIES.map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-2 text-xs text-[#4D4D4D]">
              <Icon className="w-4 h-4 shrink-0 text-[#111111]" strokeWidth={1.5} />
              {label}
            </li>
          ))}
        </ul>

        {/* Full list, collapsed by default */}
        {showAll && (
          <dl className="mt-5 space-y-3 text-xs leading-relaxed">
            {room.amenities.map((group) => (
              <div key={group.label}>
                <dt className="font-semibold uppercase tracking-[0.15em] text-[10px] text-[#6B6B6B]">{group.label}</dt>
                <dd className="text-[#4D4D4D] mt-1">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#111111] underline-offset-4 hover:underline cursor-pointer"
          >
            {showAll ? 'Hide amenities' : 'All amenities'}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => onSelect?.(room)}
            className="group/btn inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full bg-[#111111] hover:bg-[#2B2B2B] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Book
            <span className="w-8 h-8 rounded-full bg-white text-[#111111] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export const OmbaraResidences: React.FC<OmbaraResidencesProps> = ({ onSelectResidence }) => {
  return (
    <section id="rooms" className="py-24 sm:py-32 bg-white text-[#111111] relative" aria-label="Main Stay Rooms">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow">04 · Rooms & Suites</span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-medium leading-[1] mt-5">
              Luxurious <span className="font-script font-normal text-[#6B6B6B]">stays</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-[#6B6B6B] leading-relaxed lg:pb-2">
            Designed for your utmost comfort — calm, light-filled spaces with everything you need and nothing you
            don&apos;t.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {RESIDENCES_DATA.map((room, idx) => (
            <Reveal key={room.id} delay={idx * 120} className="h-full">
              <RoomCard room={room} onSelect={onSelectResidence} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

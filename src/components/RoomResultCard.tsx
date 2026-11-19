import React, { useEffect, useState } from 'react';
import {
  AirVent,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  CookingPot,
  LockKeyhole,
  Tv,
  Users,
  WashingMachine,
  Wifi,
} from 'lucide-react';
import { ROOM_RATE_PERKS, ResidenceItem } from '../data/ombaraData.ts';
import { useSwipe } from '../hooks/useSwipe.ts';

export interface Stay {
  checkIn: string; // yyyy-mm-dd
  checkOut: string;
  nights: number;
  rooms: number;
}

const SLIDE_MS = 3500;

const AMENITY_ICONS = [
  { label: 'Wi-Fi', icon: Wifi },
  { label: 'LED TV', icon: Tv },
  { label: 'Air Con', icon: AirVent },
  { label: 'Kitchenette', icon: CookingPot },
  { label: 'Washer', icon: WashingMachine },
  { label: 'Safe', icon: LockKeyhole },
];

const php = (n: number) => `₱${n.toLocaleString('en-US')}`;
const krw = (n: number) => `₩${n.toLocaleString('en-US')}`;
const fmt = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// One search result: photo slideshow · room details · dark price panel
export const RoomResultCard: React.FC<{ room: ResidenceItem; stay: Stay; onBook: () => void }> = ({
  room,
  stay,
  onBook,
}) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = room.images.length;
  const go = (i: number) => setActive((i + count) % count);
  const swipe = useSwipe(
    () => setActive((a) => (a + 1) % count),
    () => setActive((a) => (a - 1 + count) % count),
  );

  // Restart on every slide change so manual clicks get a full interval too
  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % count), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, count]);

  const total = room.pricePerNight * stay.nights * stay.rooms;
  const showTotal = stay.nights > 1 || stay.rooms > 1;
  const current = room.images[active] ?? room.images[0];

  // "Deluxe 1 Queen Bed" → "Deluxe" + italic "1 Queen Bed"
  const [firstWord, ...restWords] = room.title.split(' ');

  return (
    <li className="group relative rounded-3xl border border-[#E6E6E6] bg-white p-2.5 hover:shadow-luxury-card hover:border-transparent transition-all duration-500 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr_250px] gap-2.5">
      {/* Slideshow */}
      <div
        className="relative aspect-video md:aspect-auto md:min-h-[220px] rounded-[18px] overflow-hidden bg-[#EDEDED]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        {...swipe}
      >
        {room.images.map((img, idx) => (
          <img
            key={img.src}
            src={img.src}
            alt={`${room.title} — ${img.caption}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-out ${
              idx === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.06]'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 pointer-events-none" />

        <span className="absolute top-3.5 left-3.5 rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
          {room.label}
        </span>

        {count > 1 && (
          <>
            <button
              onClick={() => go(active - 1)}
              aria-label="Previous photo"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center lg:opacity-0 lg:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-white transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(active + 1)}
              aria-label="Next photo"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center lg:opacity-0 lg:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-white transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Caption + progress segments */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white">
          <span key={current.caption} className="animate-rise text-xs text-white/90">
            {current.caption}
          </span>
          {count > 1 && (
            <div className="flex items-center gap-1">
              {room.images.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => go(idx)}
                  aria-label={`Show ${img.caption}`}
                  className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${
                    idx === active ? 'w-6 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="px-2.5 sm:px-4 lg:px-6 py-4 lg:py-5 flex flex-col min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3]">
          {room.label} · Studio type
        </span>
        <h3 className="font-serif-luxury text-2xl font-medium leading-tight mt-1.5">
          {firstWord} <span className="font-script font-normal text-[#6B6B6B]">{restWords.join(' ')}</span>
        </h3>
        <p className="text-[13px] text-[#6B6B6B] leading-relaxed mt-2 max-w-md">{room.description}</p>

        {/* Key facts strip */}
        <dl className="grid grid-cols-3 mt-4 rounded-2xl border border-[#EDEDED] divide-x divide-[#EDEDED]">
          {[
            { icon: BedDouble, label: 'Bed', value: room.bed.replace(/ Beds?$/, '') },
            {
              icon: Users,
              label: 'Guests',
              value:
                room.standardOccupancy === room.maxOccupancy
                  ? `${room.maxOccupancy}`
                  : `${room.standardOccupancy}–${room.maxOccupancy}`,
            },
            { icon: Coffee, label: 'Breakfast', value: 'Included' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="min-w-0 px-2.5 sm:px-4 py-3">
              <dt className="flex items-center gap-1 sm:gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.15em] text-[#A3A3A3] min-w-0">
                <Icon className="hidden min-[360px]:block w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                {label}
              </dt>
              <dd className="text-sm font-semibold text-[#111111] mt-1 truncate">{value}</dd>
            </div>
          ))}
        </dl>

        {/* In-room amenities */}
        <div className="mt-auto pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3]">In the room</span>
          <ul className="grid grid-cols-2 min-[360px]:grid-cols-3 gap-x-3 gap-y-2 mt-2.5">
            {AMENITY_ICONS.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2 text-xs text-[#4D4D4D]">
                <Icon className="w-3.5 h-3.5 shrink-0 text-[#111111]" strokeWidth={1.5} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price panel */}
      <div className="md:col-span-2 lg:col-span-1 rounded-[18px] bg-[#F5F5F5] p-5 flex flex-col">

        <span className="inline-flex items-center gap-2 self-start rounded-full bg-white px-3 py-1 text-[11px] text-[#6B6B6B] tabular-nums">
          <CalendarDays className="w-3.5 h-3.5" />
          {fmt(stay.checkIn)} – {fmt(stay.checkOut)} · {stay.nights} night{stay.nights > 1 ? 's' : ''}
          {stay.rooms > 1 && ` · ${stay.rooms} rooms`}
        </span>

        <div className="mt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3]">Per night</span>
          <div className="font-serif-luxury text-[32px] font-medium leading-none tabular-nums mt-1.5">
            {php(room.pricePerNight)}
          </div>
          <span className="block text-xs text-[#6B6B6B] tabular-nums mt-1">≈ {krw(room.priceKrw)}</span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {ROOM_RATE_PERKS.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-[11px] text-[#4D4D4D] leading-snug">
              <Check className="w-3.5 h-3.5 shrink-0 mt-px text-[#111111]" strokeWidth={2.5} />
              {perk}
            </li>
          ))}
        </ul>

        {showTotal && (
          <div className="mt-4 pt-3 border-t border-[#E0E0E0] flex items-baseline justify-between text-sm">
            <span className="text-[#6B6B6B]">Total</span>
            <span className="font-semibold tabular-nums">{php(total)}</span>
          </div>
        )}

        <div className="mt-auto pt-5">
          <button
            onClick={onBook}
            className="group/btn w-full inline-flex items-center justify-between gap-2 pl-5 pr-1.5 py-1.5 rounded-full bg-[#111111] hover:bg-[#2B2B2B] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Book this room
            <span className="w-8 h-8 rounded-full bg-white text-[#111111] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </li>
  );
};

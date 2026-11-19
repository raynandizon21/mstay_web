import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, CalendarDays, Minus, Plus, Search } from 'lucide-react';
import { RESIDENCES_DATA } from '../data/ombaraData.ts';
import { RoomResultCard } from './RoomResultCard.tsx';

interface OmbaraRoomSearchProps {
  onBook: () => void;
}

const DAY = 86_400_000;

// yyyy-mm-dd in local time (toISOString would shift to UTC)
const toInput = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const fromInput = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (s: string, n: number) => toInput(new Date(fromInput(s).getTime() + n * DAY));
const nightsBetween = (a: string, b: string) => Math.round((fromInput(b).getTime() - fromInput(a).getTime()) / DAY);

const php = (n: number) => `₱${n.toLocaleString('en-US')}`;
const krw = (n: number) => `₩${n.toLocaleString('en-US')}`;

// Shared field shell: label on the left, value on the right (like the official booking page)
const Field: React.FC<{ label: string; children: React.ReactNode; compact?: boolean }> = ({
  label,
  children,
  compact = false,
}) => (
  <label
    className={`flex items-center justify-between gap-3 min-w-0 transition-colors ${
      compact
        ? 'h-11 px-4 rounded-full hover:bg-black/5 focus-within:bg-black/5'
        : 'h-14 px-4 rounded-2xl border border-[#E6E6E6] bg-white focus-within:border-[#111111]'
    }`}
  >
    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] whitespace-nowrap">{label}</span>
    {children}
  </label>
);

const Stepper: React.FC<{ value: number; min: number; max: number; onChange: (v: number) => void; label: string }> = ({
  value,
  min,
  max,
  onChange,
  label,
}) => (
  <span className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
      aria-label={`Decrease ${label}`}
      className="w-7 h-7 rounded-full border border-[#E6E6E6] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
    >
      <Minus className="w-3.5 h-3.5" />
    </button>
    <span className="w-5 text-center text-sm font-semibold tabular-nums">{value}</span>
    <button
      type="button"
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      aria-label={`Increase ${label}`}
      className="w-7 h-7 rounded-full border border-[#E6E6E6] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
    >
      <Plus className="w-3.5 h-3.5" />
    </button>
  </span>
);

// Compact stepper for the dark floating dock
const MiniStepper: React.FC<{ label: string; value: number; min: number; max: number; onChange: (v: number) => void }> = ({
  label,
  value,
  min,
  max,
  onChange,
}) => {
  const btn =
    'w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:bg-white hover:text-[#111111] disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer';
  return (
    <div className="flex items-center gap-3 px-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{label}</span>
      <span className="flex items-center gap-1.5">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label}`} className={btn}>
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-5 text-center text-sm font-semibold tabular-nums">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label}`} className={btn}>
          <Plus className="w-3 h-3" />
        </button>
      </span>
    </div>
  );
};

export const OmbaraRoomSearch: React.FC<OmbaraRoomSearchProps> = ({ onBook }) => {
  const today = useMemo(() => toInput(new Date()), []);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(() => addDays(today, 1));
  const [rooms, setRooms] = useState(1);
  const [searched, setSearched] = useState<{ checkIn: string; checkOut: string; nights: number; rooms: number } | null>(
    null,
  );

  const nights = nightsBetween(checkIn, checkOut);

  const handleCheckIn = (v: string) => {
    if (!v) return;
    setCheckIn(v);
    // keep the stay length when moving check-in; never allow checkout <= check-in
    const keep = Math.max(1, nights);
    setCheckOut(addDays(v, keep));
  };
  const handleCheckOut = (v: string) => {
    if (!v) return;
    setCheckOut(nightsBetween(checkIn, v) >= 1 ? v : addDays(checkIn, 1));
  };
  const handleNights = (n: number) => setCheckOut(addDays(checkIn, n));

  // Inline bar position → show the floating copy once it has scrolled above the viewport
  const barRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [pastBar, setPastBar] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const floating = pastBar && !footerInView;

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setPastBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);

    // Dark dock would vanish on the dark footer, so tuck it away there
    const footer = document.querySelector('footer');
    const fo = footer ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting)) : null;
    if (footer && fo) fo.observe(footer);

    return () => {
      io.disconnect();
      fo?.disconnect();
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched({ checkIn, checkOut, nights, rooms });
    // wait for the results to render, then bring them into view
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const inputClass =
    // 16px on phones: iOS Safari zooms the page when focusing inputs smaller than that
    'bg-transparent text-base sm:text-sm font-semibold text-right tabular-nums outline-none cursor-pointer min-w-0 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer';

  const renderForm = (compact: boolean) => (
    <form
      onSubmit={handleSearch}
      className={
        compact
          ? 'grid grid-cols-[1fr_1fr_auto_auto_auto] gap-1 items-center'
          : 'mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto_auto] gap-2.5 sm:gap-3'
      }
    >
      <Field label="Check-in" compact={compact}>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => handleCheckIn(e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Checkout" compact={compact}>
        <input
          type="date"
          value={checkOut}
          min={addDays(checkIn, 1)}
          onChange={(e) => handleCheckOut(e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Nights" compact={compact}>
        <Stepper value={nights} min={1} max={30} onChange={handleNights} label="nights" />
      </Field>
      <Field label="Rooms" compact={compact}>
        <Stepper value={rooms} min={1} max={10} onChange={setRooms} label="rooms" />
      </Field>
      {compact ? (
        // Same pill as the navbar's "Book a Stay"
        <button
          type="submit"
          className="group inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-[#111111] hover:bg-[#2B2B2B] text-white text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer"
        >
          Room Search
          <span className="w-7 h-7 rounded-full bg-white text-[#111111] flex items-center justify-center">
            <Search className="w-3.5 h-3.5" />
          </span>
        </button>
      ) : (
        <button
          type="submit"
          className="h-14 sm:col-span-2 lg:col-span-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111111] hover:bg-[#2B2B2B] px-6 whitespace-nowrap text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" /> Room Search
        </button>
      )}
    </form>
  );

  const fmtShort = (s: string) => fromInput(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <>
    <section id="search" className="bg-[#F5F5F5] text-[#111111] py-10 sm:py-16" aria-label="Search rooms">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-[#E6E6E6] bg-white p-2 sm:p-2.5">
          <div className="rounded-[18px] bg-[#FAFAFA] px-4 sm:px-8 py-6 sm:py-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Check availability</span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium mt-3">
                  Search for <span className="font-script font-normal text-[#6B6B6B]">rooms</span>
                </h2>
              </div>
              <p className="text-xs text-[#6B6B6B]">Rates per room, per night · Free breakfast for 1 included</p>
            </div>

            {/* Search bar */}
            <div ref={barRef}>{renderForm(false)}</div>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div ref={resultsRef} key={`${searched.checkIn}-${searched.checkOut}-${searched.rooms}`} className="animate-rise mt-6 scroll-mt-28">
            <p className="flex items-start gap-2.5 rounded-xl bg-[#FFF4F2] px-4 py-3 text-[13px] leading-relaxed text-[#7A2E1F]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Please confirm availability for your dates and room type via KakaoTalk or phone{' '}
                <strong>before</strong> requesting a reservation — requests without prior confirmation are automatically
                cancelled.
              </span>
            </p>

            <ul className="mt-4 grid grid-cols-1 gap-5">
              {RESIDENCES_DATA.map((room) => (
                <RoomResultCard key={room.id} room={room} stay={searched} onBook={onBook} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>

    {/* Floating dock: compact dark capsule (distinct from the white navbar) */}
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 inset-x-0 z-40 px-4 flex justify-center transition-all duration-500 ease-out ${
        floating ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0 pointer-events-none'
      }`}
      aria-hidden={!floating}
    >
      <form
        onSubmit={handleSearch}
        className="hidden lg:flex items-center rounded-full bg-[#111111]/85 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] p-1.5 pl-2"
      >
        {/* Dates: one segment, native picker hidden under the formatted text */}
        <div className="flex items-center gap-1 px-4">
          <CalendarDays className="w-4 h-4 text-white/50 mr-2" />
          <label className="relative flex items-center gap-2 cursor-pointer rounded-full px-3 py-2 hover:bg-white/10 transition-colors">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Check-in</span>
            <span className="text-sm font-semibold tabular-nums whitespace-nowrap">{fmtShort(checkIn)}</span>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => handleCheckIn(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker?.()}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Check-in date"
            />
          </label>
          <ArrowRight className="w-3.5 h-3.5 text-white/35" />
          <label className="relative flex items-center gap-2 cursor-pointer rounded-full px-3 py-2 hover:bg-white/10 transition-colors">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Checkout</span>
            <span className="text-sm font-semibold tabular-nums whitespace-nowrap">{fmtShort(checkOut)}</span>
            <input
              type="date"
              value={checkOut}
              min={addDays(checkIn, 1)}
              onChange={(e) => handleCheckOut(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker?.()}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Checkout date"
            />
          </label>
        </div>

        <span className="w-px h-8 bg-white/15" />
        <MiniStepper label="Nights" value={nights} min={1} max={30} onChange={handleNights} />
        <span className="w-px h-8 bg-white/15" />
        <MiniStepper label="Rooms" value={rooms} min={1} max={10} onChange={setRooms} />

        <button
          type="submit"
          className="ml-2 inline-flex items-center gap-2 h-11 pl-5 pr-1.5 rounded-full bg-white text-[#111111] text-[13px] font-semibold whitespace-nowrap hover:bg-[#EDEDED] transition-colors cursor-pointer"
        >
          Search
          <span className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center">
            <Search className="w-3.5 h-3.5" />
          </span>
        </button>
      </form>

      {/* Mobile / tablet: summary capsule that jumps back to the full bar */}
      <button
        type="button"
        onClick={() => barRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        className="lg:hidden w-full max-w-md flex items-center justify-between gap-3 rounded-full bg-[#111111]/85 backdrop-blur-2xl border border-white/10 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] pl-5 pr-1.5 py-1.5 cursor-pointer"
      >
        <span className="text-left min-w-0">
          <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Check availability
          </span>
          <span className="block text-sm font-semibold tabular-nums truncate">
            {fmtShort(checkIn)} – {fmtShort(checkOut)} · {nights}N · {rooms} room{rooms > 1 ? 's' : ''}
          </span>
        </span>
        <span className="shrink-0 w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center">
          <Search className="w-4 h-4" />
        </span>
      </button>
    </div>
    </>
  );
};

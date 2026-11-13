import React, { useState } from 'react';
import { Calendar, Users, Home, Search, ShieldCheck } from 'lucide-react';
import { ROOMS } from '../data/hotelData.ts';

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  roomType: string;
  promoCode: string;
}

interface BookingSearchBarProps {
  onSearch: (params: BookingSearchParams) => void;
}

export const BookingSearchBar: React.FC<BookingSearchBarProps> = ({ onSearch }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDate = new Date(tomorrow);
  nextDate.setDate(tomorrow.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDate(nextDate));
  const [guests, setGuests] = useState<number>(2);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('all');
  const [promoCode, setPromoCode] = useState<string>('');
  const [showPromo, setShowPromo] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const inTime = new Date(checkIn).getTime();
    const outTime = new Date(checkOut).getTime();

    if (isNaN(inTime) || isNaN(outTime)) {
      setValidationError('Please select valid arrival and departure dates.');
      return;
    }

    if (outTime <= inTime) {
      setValidationError('Check-out date must be after check-in date.');
      return;
    }

    onSearch({
      checkIn,
      checkOut,
      guests,
      rooms: roomCount,
      roomType: selectedRoomId,
      promoCode,
    });
  };

  return (
    <div
      id="booking-bar"
      className="relative z-30 max-w-5xl mx-auto px-4 -mt-8 sm:-mt-10"
    >
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white border border-[#E6E6E6] rounded-sm shadow-2xl p-5 sm:p-6 text-[#111111]"
        style={{
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        }}
      >
        {/* Top Guarantee Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#F2F2F2] text-xs text-[#6B6B6B]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#111111]" />
            <span className="font-semibold text-[#111111]">
              Main Stay Direct Advantage: Best Guaranteed Rates & Flexible 48h Cancellation
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPromo(!showPromo)}
            className="text-xs text-[#111111] hover:text-[#3A3A3A] transition-colors cursor-pointer ml-auto font-semibold"
          >
            {showPromo ? 'Hide Promo Code' : '+ Add Corporate / Promo Code'}
          </button>
        </div>

        {/* 4-Column Modern Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Check-In */}
          <div className="space-y-1.5">
            <label
              htmlFor="checkInInput"
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#6B6B6B] font-bold"
            >
              <Calendar className="w-3.5 h-3.5 text-[#111111]" />
              <span>Arrival</span>
            </label>
            <input
              id="checkInInput"
              type="date"
              value={checkIn}
              min={formatDate(new Date())}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/20 text-xs text-[#111111] font-medium py-2.5 px-3 rounded-xs outline-none transition-all"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label
              htmlFor="checkOutInput"
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#6B6B6B] font-bold"
            >
              <Calendar className="w-3.5 h-3.5 text-[#111111]" />
              <span>Departure</span>
            </label>
            <input
              id="checkOutInput"
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/20 text-xs text-[#111111] font-medium py-2.5 px-3 rounded-xs outline-none transition-all"
              required
            />
          </div>

          {/* Guests & Suites */}
          <div className="space-y-1.5">
            <label
              htmlFor="guestsSelect"
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#6B6B6B] font-bold"
            >
              <Users className="w-3.5 h-3.5 text-[#111111]" />
              <span>Guests & Suites</span>
            </label>
            <select
              id="guestsSelect"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/20 text-xs text-[#111111] font-medium py-2.5 px-3 rounded-xs outline-none transition-all cursor-pointer"
            >
              <option value={1}>1 Guest · Studio</option>
              <option value={2}>2 Guests · Executive Suite</option>
              <option value={3}>3 Guests · Corner Suite</option>
              <option value={4}>4 Guests · Presidential Suite</option>
              <option value={6}>6 Guests · Sky Penthouse</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs uppercase tracking-[0.16em] font-bold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-neutral-900/20 h-[40px] rounded-xs"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span>Check Rates</span>
            </button>
          </div>
        </div>

        {/* Promo Code Input */}
        {showPromo && (
          <div className="mt-4 pt-3.5 border-t border-[#F2F2F2] flex flex-wrap items-center gap-3">
            <span className="text-xs text-[#6B6B6B] font-medium">Corporate Privilege Code:</span>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="e.g. MAINSTAYVIP"
              className="bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] font-semibold py-1.5 px-3 uppercase tracking-wider outline-none w-48 rounded-xs"
            />
            <span className="text-xs text-[#111111] font-medium">
              Corporate partner discount applied automatically.
            </span>
          </div>
        )}

        {/* Validation */}
        {validationError && (
          <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-xs">
            {validationError}
          </div>
        )}
      </form>
    </div>
  );
};

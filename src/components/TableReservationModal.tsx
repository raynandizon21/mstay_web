import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { DiningVenue } from '../data/hotelData.ts';

interface TableReservationModalProps {
  venue: DiningVenue | null;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  venue,
  onClose,
}) => {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dietary, setDietary] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [reservationRef, setReservationRef] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && venue) onClose();
    };
    if (venue) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setConfirmed(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [venue, onClose]);

  if (!venue) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TAB-${Math.floor(10000 + Math.random() * 90000)}`;
    setReservationRef(ref);
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white border border-[#E6E6E6] shadow-2xl p-6 sm:p-8 text-[#111111] rounded-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E6E6]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                Table Reservation
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-[#111111] font-bold">
              {venue.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="p-3 bg-[#FAFAFA] border border-[#E6E6E6] text-xs text-[#6B6B6B] font-normal space-y-1">
              <div className="text-[#111111] font-bold">{venue.subtitle}</div>
              <div>Dress Code: {venue.dressCode}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Seating Time
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2 px-3 outline-none cursor-pointer"
                >
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30 (Prime)</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2 px-3 outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6 Guests</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Victoria Spencer"
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                Dietary Preferences or Allergies
              </label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Vegetarian, pescatarian, allergies, wine pairing preference..."
                className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#E6E6E6]">
              <span className="text-[10px] text-[#6B6B6B] font-normal">
                Head Sommelier consultation included.
              </span>
              <button
                type="submit"
                className="py-2.5 px-6 text-[11px] uppercase tracking-[0.16em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-md"
              >
                Confirm Table
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-xl bg-[#111111]/10 border border-[#111111]/30 mx-auto flex items-center justify-center text-[#111111]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-heading text-2xl text-[#111111] font-bold">
                Table Confirmed, {name}
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1 font-normal">
                Your reservation at <strong>{venue.name}</strong> on <strong>{date}</strong> at{' '}
                <strong>{timeSlot}</strong> has been secured.
              </p>
            </div>

            <div className="p-2.5 bg-[#FAFAFA] border border-[#E6E6E6] inline-block text-xs rounded-xs">
              <span className="text-[#6B6B6B]">Ref: </span>
              <span className="font-mono text-[#111111] font-bold">{reservationRef}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="py-2 px-6 text-xs uppercase tracking-wider font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

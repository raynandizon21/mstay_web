import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Download, Printer } from 'lucide-react';
import { ROOMS, Room, ExclusiveOffer } from '../data/hotelData.ts';
import { BookingSearchParams } from './BookingSearchBar.tsx';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: BookingSearchParams | null;
  selectedRoom?: Room | null;
  selectedOffer?: ExclusiveOffer | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  selectedRoom,
  selectedOffer,
}) => {
  const [step, setStep] = useState<'details' | 'guest' | 'confirmed'>('details');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDate = new Date(tomorrow);
  nextDate.setDate(tomorrow.getDate() + 2);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(
    initialParams?.checkIn || formatDate(tomorrow)
  );
  const [checkOut, setCheckOut] = useState<string>(
    initialParams?.checkOut || formatDate(nextDate)
  );
  const [guests, setGuests] = useState<number>(initialParams?.guests || 2);
  const [roomType, setRoomType] = useState<string>(
    selectedRoom?.id || initialParams?.roomType || ROOMS[0].id
  );

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (selectedRoom) {
      setRoomType(selectedRoom.id);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (initialParams) {
      if (initialParams.checkIn) setCheckIn(initialParams.checkIn);
      if (initialParams.checkOut) setCheckOut(initialParams.checkOut);
      if (initialParams.guests) setGuests(initialParams.guests);
      if (initialParams.roomType && initialParams.roomType !== 'all') {
        setRoomType(initialParams.roomType);
      }
    }
  }, [initialParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setStep('details');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const chosenRoom = ROOMS.find((r) => r.id === roomType) || ROOMS[0];
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = Math.max(1, outDate.getTime() - inDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseRate = chosenRoom.startingPriceUsd;
  const subtotal = baseRate * nights;
  const taxesAndFees = Math.round(subtotal * 0.14);
  const totalCost = subtotal + taxesAndFees;

  const handleProceedToGuest = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('guest');
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = `MSH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(randomCode);
      setStep('confirmed');
    }, 600);
  };

  const downloadCalendarEvent = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Main Stay Hotel//Reservations//EN
BEGIN:VEVENT
SUMMARY:Stay at Main Stay Hotel (${chosenRoom.name})
DESCRIPTION:Reservation Code: ${confirmationCode}\\nGuest: ${guestName}\\nNights: ${nights}\\nAddress: 100 Grand Boulevard, Metropolis
DTSTART:${checkIn.replace(/-/g, '')}T150000Z
DTEND:${checkOut.replace(/-/g, '')}T120000Z
LOCATION:Main Stay Hotel, 100 Grand Boulevard, Metropolis
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Main_Stay_Reservation_${confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white border border-[#E6E6E6] shadow-2xl p-6 sm:p-8 text-[#111111] max-h-[92vh] overflow-y-auto rounded-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E6E6]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                Online Reservation Concierge
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-[#111111] font-bold">
              {step === 'confirmed' ? 'Reservation Confirmed' : 'Reserve Your Residence'}
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

        {/* STEP 1: Dates & Suite Selection */}
        {step === 'details' && (
          <form onSubmit={handleProceedToGuest} className="mt-6 space-y-6">
            {selectedOffer && (
              <div className="p-3 bg-[#FAFAFA] border border-[#111111]/30 text-xs text-[#111111] flex items-center justify-between rounded-xs">
                <span>Selected Offer: <strong>{selectedOffer.title}</strong></span>
                <span className="text-[10px] text-[#111111] font-bold">Inclusions applied</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={formatDate(new Date())}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2.5 px-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2.5 px-3 outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Residence Category
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2.5 px-3 outline-none cursor-pointer"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} · ${r.startingPriceUsd}/night
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] text-xs text-[#111111] py-2.5 px-3 outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6 Guests (Penthouse)</option>
                </select>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-[#FAFAFA] border border-[#E6E6E6] space-y-2 text-xs font-normal">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>
                  {chosenRoom.name} (${baseRate} × {nights} {nights === 1 ? 'night' : 'nights'})
                </span>
                <span className="text-[#111111] font-mono tabular-nums font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span>State & City Hospitality Taxes (14%)</span>
                <span className="text-[#111111] font-mono tabular-nums font-semibold">${taxesAndFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Direct Booking Privileges & Fiber Wi-Fi</span>
                <span className="text-[#111111] font-semibold">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-[#E6E6E6] flex justify-between font-heading text-base text-[#111111] font-bold">
                <span>Estimated Total (USD)</span>
                <span className="font-mono tabular-nums text-[#111111]">${totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-[#6B6B6B] font-normal">
                Flexible cancellation up to 48 hours prior to arrival.
              </span>
              <button
                type="submit"
                className="py-2.5 px-6 text-[11px] uppercase tracking-[0.16em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-md"
              >
                Continue to Guest Details
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Guest Details */}
        {step === 'guest' && (
          <form onSubmit={handleConfirmReservation} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Julian Sterling"
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Telephone (For Chauffeur & Arrival)
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+1 (555) 012-3456"
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                  Flight / Arrival Time (Optional)
                </label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="e.g. Flight 108 / 15:30 Arrival"
                  className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#6B6B6B] block mb-1 font-semibold">
                Special Requests or Dietary Considerations
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="High floor preference, dietary requirements, anniversary celebration..."
                className="w-full bg-[#FAFAFA] border border-[#D9D9D9] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-xs text-[#111111] py-2 px-3 outline-none"
              />
            </div>

            <div className="p-3 bg-[#FAFAFA] border border-[#E6E6E6] text-[11px] text-[#6B6B6B] font-normal">
              Payment is settled upon check-in or departure via your preferred credit card. Direct booking benefits apply automatically.
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E6E6E6]">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#6B6B6B] hover:text-[#111111] cursor-pointer font-medium"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 px-6 text-[11px] uppercase tracking-[0.16em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Securing Residence...' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Confirmed Voucher */}
        {step === 'confirmed' && (
          <div className="mt-6 space-y-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#111111]/10 border border-[#111111]/30 mx-auto flex items-center justify-center text-[#111111]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FAFAFA] border border-[#E6E6E6] text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold mb-2">
                Confirmed Booking Voucher
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-[#111111] font-bold">
                We Await Your Arrival, {guestName}.
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1.5 font-normal">
                A confirmation dossier has been dispatched to <strong>{guestEmail}</strong>.
              </p>
            </div>

            <div className="text-left bg-[#FAFAFA] border border-[#E6E6E6] p-5 space-y-3 rounded-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#E6E6E6]">
                <div>
                  <span className="text-[9px] text-[#6B6B6B] uppercase tracking-wider block font-semibold">
                    Confirmation Code
                  </span>
                  <span className="font-mono text-base text-[#111111] font-bold">
                    {confirmationCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#6B6B6B] uppercase tracking-wider block font-semibold">
                    Amount Due on Arrival
                  </span>
                  <span className="font-mono text-base text-[#111111] font-bold">
                    ${totalCost.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-[#6B6B6B] font-normal">
                <div>
                  <span className="block text-[9px] uppercase text-[#111111] font-bold">Residence</span>
                  <span className="text-[#111111] font-semibold">{chosenRoom.name}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-[#111111] font-bold">Duration</span>
                  <span className="text-[#111111]">{nights} Nights ({guests} Guests)</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-[#111111] font-bold">Arrival</span>
                  <span className="text-[#111111]">{checkIn} (15:00)</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-[#111111] font-bold">Departure</span>
                  <span className="text-[#111111]">{checkOut} (12:00)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={downloadCalendarEvent}
                className="py-2 px-3 text-xs text-[#111111] bg-white hover:bg-[#FAFAFA] border border-[#D9D9D9] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs font-medium"
              >
                <Download className="w-3.5 h-3.5 text-[#111111]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="py-2 px-3 text-xs text-[#111111] bg-white hover:bg-[#FAFAFA] border border-[#D9D9D9] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs font-medium"
              >
                <Printer className="w-3.5 h-3.5 text-[#111111]" />
                <span>Print Dossier</span>
              </button>

              <button
                onClick={onClose}
                className="py-2 px-6 text-xs uppercase tracking-wider font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-colors cursor-pointer shadow-xs"
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

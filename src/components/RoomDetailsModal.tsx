import React, { useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { Room } from '../data/hotelData.ts';

interface RoomDetailsModalProps {
  room: Room | null;
  onClose: () => void;
  onReserve: (room: Room) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  onClose,
  onReserve,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && room) onClose();
    };
    if (room) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [room, onClose]);

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white border border-[#E6E6E6] shadow-2xl p-6 sm:p-8 text-[#111111] max-h-[92vh] overflow-y-auto rounded-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E6E6]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                Residence Specification
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#111111] font-bold">
              {room.name}
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

        {/* Image Showcase */}
        <div className="my-6 aspect-[16/9] overflow-hidden bg-[#F2F2F2] border border-[#E6E6E6]">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Metadata Spec Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B6B6B] py-3 border-y border-[#F2F2F2] font-normal mb-6">
          <span className="text-[#111111] font-semibold">{room.sizeSqM} m² / {room.sizeSqFt} sq ft</span>
          <span aria-hidden="true" className="text-[#D9D9D9]">·</span>
          <span>Up to {room.maxGuests} Guests</span>
          <span aria-hidden="true" className="text-[#D9D9D9]">·</span>
          <span>{room.floor}</span>
          <span aria-hidden="true" className="text-[#D9D9D9]">·</span>
          <span className="text-[#111111] font-medium">{room.view}</span>
        </div>

        {/* Narrative */}
        <div className="space-y-4">
          <p className="text-sm text-[#333333] font-normal leading-relaxed">
            {room.description}
          </p>

          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold block mb-3">
              Curated In-Residence Inclusions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#4D4D4D] font-normal">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>Twice-Daily Housekeeping with Aromatherapy Turndown</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>Private Electric Chauffeur Airport Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#E6E6E6] flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#6B6B6B] uppercase tracking-wider block font-semibold">Official Rate</span>
            <span className="font-heading text-2xl text-[#111111] font-bold tabular-nums">
              ${room.startingPriceUsd}
            </span>
            <span className="text-xs text-[#6B6B6B] font-normal"> / night</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onReserve(room);
              }}
              className="px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>Reserve Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

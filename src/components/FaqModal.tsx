import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Phone } from 'lucide-react';
import { HOTEL_LOCATION } from '../data/hotelData.ts';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'What are the official check-in and check-out times?',
      a: 'Official check-in begins at 15:00, and check-out is at 12:00 noon. Guests reserving directly through our official website or staying in our Executive Suites enjoy guaranteed priority early check-in (from 11:00) and extended check-out privileges (until 16:00) subject to availability.',
    },
    {
      q: 'How do I arrange private chauffeur or airport transfers?',
      a: 'Our house fleet of custom electric Lucid Air and BMW i7 executive sedans is on call 24 hours daily. For all Executive Suite and Penthouse guests, round-trip airport transfers are complimentary. Please advise our concierge desk of your flight details at least 24 hours prior to arrival.',
    },
    {
      q: 'What is the dress code for Cobalt & Oak and The M Bar?',
      a: 'For Cobalt & Oak (2 Michelin Stars), elegant contemporary formal attire is requested (jackets recommended for gentlemen). The M Bar & Skyline Lounge welcomes sophisticated smart-casual attire.',
    },
    {
      q: 'Are pets permitted at Main Stay Hotel?',
      a: 'We warmly welcome companion dogs up to 15 kg (33 lbs). Our Canine Resident program provides bespoke memory-foam bedding, porcelain dining bowls, and an organic room-service gourmet menu.',
    },
    {
      q: 'What is your cancellation and amendment policy?',
      a: 'Direct reservations may be amended or canceled without penalty up to 48 hours prior to 15:00 local time on the day of scheduled arrival.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#111111]/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-[#E6E6E6] shadow-2xl p-6 sm:p-8 text-[#111111] max-h-[90vh] overflow-y-auto rounded-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E6E6]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                Guest Services Directory
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-[#111111] font-bold">
              Frequently Asked Questions
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

        {/* FAQs */}
        <div className="mt-6 space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-[#F2F2F2] pb-3"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left py-2 flex items-center justify-between gap-4 cursor-pointer hover:text-[#111111] transition-colors"
              >
                <span className="font-heading text-base text-[#111111] font-semibold">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#111111] transition-transform shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="pt-2 text-xs text-[#6B6B6B] leading-relaxed font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Concierge Hotline */}
        <div className="mt-8 pt-6 border-t border-[#E6E6E6] flex items-center justify-between text-xs text-[#6B6B6B] font-normal">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#111111]" />
            <span>Concierge Desk: <strong className="text-[#111111]">{HOTEL_LOCATION.telephone}</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 text-xs uppercase tracking-wider text-white bg-[#111111] hover:bg-[#3A3A3A] transition-colors font-semibold cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

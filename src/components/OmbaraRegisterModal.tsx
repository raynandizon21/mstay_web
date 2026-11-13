import React, { useEffect } from 'react';
import { AlertTriangle, Landmark, MessageCircle, Phone, X } from 'lucide-react';
import { OmbaraLogo } from './OmbaraLogo.tsx';
import { HOTEL_INFO, RESERVATION_STEPS } from '../data/ombaraData.ts';

interface OmbaraRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reservation guide. Bookings are confirmed by the hotel through KakaoTalk / phone + deposit,
// so this modal explains the process and links to those channels instead of a fake form.
export const OmbaraRegisterModal: React.FC<OmbaraRegisterModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { deposit, bank, phones, kakaoTalkUrl } = HOTEL_INFO;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="How to reserve"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl max-h-[94vh] overflow-y-auto bg-white text-[#111111] rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="eyebrow">Reservations</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium mt-3">
              How to <span className="font-script font-normal text-[#6B6B6B]">reserve</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">
              <OmbaraLogo size="sm" inverted={false} />
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center text-[#6B6B6B] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Important notice */}
        <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#FFF4F2] px-4 py-3 text-[13px] leading-relaxed text-[#7A2E1F]">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Check availability for your dates and room type <strong>before</strong> requesting a reservation —
            requests without prior confirmation are automatically cancelled.
          </span>
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: steps */}
          <ol className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RESERVATION_STEPS.map((step, idx) => (
              <li key={step.title} className="rounded-2xl border border-[#E6E6E6] p-5">
                <span className="font-mono text-xs text-[#A3A3A3]">Step {String(idx + 1).padStart(2, '0')}</span>
                <h3 className="text-[15px] font-semibold mt-2">{step.title}</h3>
                <p className="text-[13px] text-[#6B6B6B] leading-relaxed mt-1.5">{step.description}</p>
              </li>
            ))}
          </ol>

          {/* Right: deposit + contacts */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="rounded-2xl bg-[#111111] text-white p-5">
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <Landmark className="w-4 h-4" /> Deposit account
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 normal-case tracking-normal text-white/85">
                  {deposit.currency}
                  {deposit.amountPerNight} / night
                </span>
              </div>
              <div className="font-serif-luxury text-2xl sm:text-[28px] font-medium mt-3 tabular-nums">{bank.account}</div>
              <div className="text-xs text-white/55 mt-1">
                {bank.name} · {bank.holder}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E6E6E6] divide-y divide-[#EDEDED]">
              {phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="group flex items-center gap-3 px-5 py-3.5 hover:bg-[#F5F5F5] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#6B6B6B] group-hover:text-[#111111]" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-[#6B6B6B]">{p.label}</span>
                    {'hours' in p && p.hours && <span className="block text-[11px] text-[#A3A3A3]">{p.hours}</span>}
                  </span>
                  <span className="text-sm font-semibold tabular-nums whitespace-nowrap">{p.display}</span>
                </a>
              ))}
            </div>

            {kakaoTalkUrl && (
              <a
                href={kakaoTalkUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#FEE500] text-[#191919] py-3.5 text-sm font-semibold hover:brightness-95 transition"
              >
                <MessageCircle className="w-4 h-4" /> KakaoTalk Consultation
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

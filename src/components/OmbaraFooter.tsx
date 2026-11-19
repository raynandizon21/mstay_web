import React from 'react';
import { Instagram, MessageCircle, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { OmbaraLogo } from './OmbaraLogo.tsx';
import { HOTEL_INFO } from '../data/ombaraData.ts';

interface OmbaraFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
  onOpenVirtualTour: () => void;
}

const LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'Experience', id: 'experience' },
  { label: 'Explore Clark', id: 'usps' },
  { label: 'Facilities', id: 'facilities' },
  { label: 'Rooms & Suites', id: 'rooms' },
  { label: 'Gallery', id: 'gallery' },
];

export const OmbaraFooter: React.FC<OmbaraFooterProps> = ({
  onNavigate,
  onOpenRegister,
  onOpenVirtualTour,
}) => {
  return (
    <footer id="contact" className="relative isolate bg-[#111111] text-white pt-6 pb-10 select-none">
      {/* Soft warm glow for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]"
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* CTA band */}
        <div className="relative overflow-hidden rounded-3xl bg-white text-[#111111] px-7 py-12 sm:px-14 sm:py-16 mb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-24 font-serif-luxury font-bold text-[320px] leading-none text-black/[0.04]"
          >
            M
          </div>
          <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="eyebrow">Reservations</span>
              <h2 className="font-serif-luxury text-[44px] sm:text-6xl font-medium leading-[0.95] mt-5 max-w-2xl">
                Your stay, <span className="font-script font-normal text-[#6B6B6B]">reimagined.</span>
              </h2>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap gap-3">
              <button
                onClick={onOpenVirtualTour}
                className="px-6 py-4 rounded-full border border-[#D9D9D9] text-sm font-medium hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                Virtual Tour
              </button>
              <button
                onClick={onOpenRegister}
                className="group inline-flex items-center justify-between sm:justify-start gap-3 pl-6 pr-2 py-2 rounded-full bg-[#111111] hover:bg-[#2B2B2B] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Book Your Stay
                <span className="w-9 h-9 rounded-full bg-white text-[#111111] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 md:pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <OmbaraLogo size="lg" inverted={true} />
            <p className="text-sm text-white/55 leading-relaxed max-w-sm">
              M Stay Hotel — a new studio hotel inside Clark Freeport Zone, opened in 2022. 101 spacious rooms, golf
              traveler services, Damso Korean restaurant and a Korean market on the ground floor.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#111111] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#111111] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-semibold block mb-5">
              Explore
            </span>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-3 text-sm text-white/75">
              {LINKS.map((link) => (
                <li key={link.id + link.label}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-semibold block mb-5">
              Contact
            </span>
            <div className="space-y-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D9D9D9] shrink-0 mt-0.5" />
                <a href={HOTEL_INFO.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {HOTEL_INFO.address}
                </a>
              </div>
              {HOTEL_INFO.phones.map((p) => (
                <div key={p.tel} className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D9D9D9] shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-white/40">{p.label}</span>
                    <a href={`tel:${p.tel}`} className="hover:text-white transition-colors">
                      {p.display}
                    </a>
                    {'hours' in p && p.hours && <span className="block text-xs text-white/40 mt-0.5">{p.hours}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="text-center sm:text-left space-y-1">
            <div>
              {HOTEL_INFO.name} · CEO: {HOTEL_INFO.company.ceo} · Business Reg. No. {HOTEL_INFO.company.businessRegNo} ·
              Mail-Order Business No. {HOTEL_INFO.company.mailOrderNo}
            </div>
            <div>Korea office: {HOTEL_INFO.company.koreaAddress}</div>
            <div>© {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved.</div>
          </div>
          <div className="flex items-center gap-5">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

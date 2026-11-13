import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { HOTEL_LOCATION } from '../data/hotelData.ts';

interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenFaq: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenFaq,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <footer
      className="bg-[#FAFAFA] text-[#111111] border-t border-[#E6E6E6] pt-20 pb-12 select-none"
      aria-label="Hotel Footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E6E6E6]">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo size="lg" variant="full" inverted={false} />
            <p className="text-xs text-[#6B6B6B] font-normal leading-relaxed max-w-sm">
              Main Stay Hotel represents an artful synthesis of metropolitan architectural elegance, two-Michelin-starred gastronomy, and intuitive 5-star hospitality.
            </p>

            <div className="pt-2 text-xs text-[#6B6B6B] font-normal space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>{HOTEL_LOCATION.address}, {HOTEL_LOCATION.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>Concierge & Reservations: {HOTEL_LOCATION.telephone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>{HOTEL_LOCATION.reservationsEmail}</span>
              </div>
            </div>
          </div>

          {/* Minimalist Newsletter */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E6E6E6] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                  Main Stay Dispatch
                </span>
              </div>
              <h3 className="font-heading text-2xl text-[#111111] font-bold">
                Receive Curated Seasonal Privileges
              </h3>
              <p className="text-xs text-[#6B6B6B] font-normal max-w-md">
                Private cellar releases, exclusive modern art previews, and preferential residence booking windows.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="mt-6 max-w-lg">
              <div className="flex gap-2 border-b border-[#D9D9D9] pb-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent text-xs text-[#111111] py-2 px-1 outline-none font-normal placeholder:text-[#A3A3A3]"
                  required
                />
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#111111] hover:text-[#3A3A3A] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsletterStatus === 'success' && (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-600 font-normal">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Welcome. A confirmation dossier has been dispatched.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#E6E6E6] text-xs">
          <div className="space-y-3">
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block">
              The Residences
            </span>
            <ul className="space-y-2 text-[#6B6B6B] font-normal">
              <li>
                <button
                  onClick={() => onNavigate('accommodation')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Atelier Studio Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accommodation')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Executive Corner Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accommodation')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Main Stay Presidential
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accommodation')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Grand Sky Penthouse
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block">
              Dining & Wellness
            </span>
            <ul className="space-y-2 text-[#6B6B6B] font-normal">
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Cobalt & Oak (2 Michelin Stars)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  The M Bar & Skyline Lounge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wellness')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Skyline Vitality Pool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wellness')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Elemental Spa Rituals
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block">
              Guest Services
            </span>
            <ul className="space-y-2 text-[#6B6B6B] font-normal">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Online Room Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Electric Chauffeur Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFaq}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Accessibility Information
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#111111] font-bold block">
              Distinctions & Social
            </span>
            <ul className="space-y-2 text-[#6B6B6B] font-normal">
              <li className="flex items-center gap-1.5 text-[#111111]">
                <span className="text-[#111111]">★</span> Forbes Five-Star Award
              </li>
              <li className="flex items-center gap-1.5 text-[#111111]">
                <span className="text-[#111111]">★</span> Condé Nast Gold List 2026
              </li>
              <li className="pt-2 flex items-center gap-3 text-[#6B6B6B]">
                <a href="#instagram" className="hover:text-[#111111] transition-colors">
                  Instagram
                </a>
                <span>·</span>
                <a href="#facebook" className="hover:text-[#111111] transition-colors">
                  Facebook
                </a>
                <span>·</span>
                <a href="#linkedin" className="hover:text-[#111111] transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3] font-normal">
          <div>
            © {new Date().getFullYear()} Main Stay Hotel LLC. All rights reserved. Modern 5-Star Luxury.
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-[#111111] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button className="hover:text-[#111111] transition-colors cursor-pointer">
              Cookie Preferences
            </button>
            <span>·</span>
            <button className="hover:text-[#111111] transition-colors cursor-pointer">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

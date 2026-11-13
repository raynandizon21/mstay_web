import React, { useEffect } from 'react';
import { X, Phone, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { HOTEL_LOCATION } from '../data/hotelData.ts';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBooking,
}) => {
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

  const links = [
    { label: 'Suites & Residences', id: 'accommodation', desc: 'Curated architectural sanctuaries' },
    { label: 'Signature Dining', id: 'dining', desc: 'Cobalt & Oak & The M Lounge' },
    { label: 'Wellness Sanctuary', id: 'wellness', desc: 'Skyline vitality pool & elemental spa' },
    { label: 'Curated Experiences', id: 'experiences', desc: 'Bespoke metropolitan curation' },
    { label: 'Property Gallery', id: 'gallery', desc: 'Architecture, interiors & details' },
    { label: 'Location & Arrival', id: 'location', desc: '100 Grand Boulevard' },
    { label: 'Exclusive Packages', id: 'offers', desc: 'Seasonal privileges' },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white border-l border-[#E6E6E6] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E6]">
            <BrandLogo size="sm" variant="full" inverted={false} />
            <button
              onClick={onClose}
              className="p-1.5 text-[#6B6B6B] hover:text-[#111111] transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-8 space-y-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  onClose();
                }}
                className="w-full text-left py-1.5 group cursor-pointer"
              >
                <div className="font-heading text-lg text-[#111111] group-hover:text-[#111111] transition-colors font-bold">
                  {link.label}
                </div>
                <div className="text-[11px] text-[#6B6B6B] tracking-normal mt-0.5 font-normal">{link.desc}</div>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#E6E6E6] space-y-4">
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full py-3 text-[11px] uppercase tracking-[0.18em] font-semibold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-colors text-center cursor-pointer shadow-md"
          >
            Reserve Your Stay
          </button>

          <div className="space-y-1.5 text-xs text-[#6B6B6B] font-normal">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#111111]" />
              <span>{HOTEL_LOCATION.telephone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#111111]" />
              <span>{HOTEL_LOCATION.reservationsEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

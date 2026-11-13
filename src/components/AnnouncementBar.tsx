import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onExploreOffers: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onExploreOffers }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Seasonal announcement"
      className="relative z-50 bg-[#F2F2F2] border-b border-[#E6E6E6] text-[#333333] text-xs py-2 px-6 transition-all duration-300 font-normal"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center text-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111] bg-[#F2F2F2]/60 px-2 py-0.5 rounded-xs">
            Main Stay Privilege
          </span>
          <span className="text-[#D9D9D9]">·</span>
          <span className="text-[#111111] text-[11px] tracking-wide font-medium">
            Complimentary House Chauffeur Airport Transfer with Suite Reservations
          </span>
          <button
            onClick={onExploreOffers}
            className="inline-flex items-center gap-1 text-[#111111] hover:text-[#3A3A3A] font-semibold transition-colors cursor-pointer ml-1.5 text-[11px] underline underline-offset-4"
          >
            <span>Explore Offers</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-[#6B6B6B] hover:text-[#111111] p-1 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

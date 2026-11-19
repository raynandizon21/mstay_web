import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { GALLERY_NARRATIVE_ITEMS } from '../data/ombaraData.ts';
import { Reveal } from './Reveal.tsx';

interface OmbaraGalleryProps {
  onOpenVirtualTour: () => void;
}

export const OmbaraGallery: React.FC<OmbaraGalleryProps> = ({ onOpenVirtualTour }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = GALLERY_NARRATIVE_ITEMS.length;

  // Which card is closest to the left edge of the swipe rail
  const handleScroll = () => {
    const rail = railRef.current;
    const first = rail?.children[0] as HTMLElement | undefined;
    if (!rail || !first) return;
    const step = first.offsetWidth + 16; // card width + gap-4
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    setCurrent(atEnd ? total - 1 : Math.min(total - 1, Math.round(rail.scrollLeft / step)));
  };

  return (
    <section
      id="gallery"
      className="py-20 sm:py-32 bg-[#F5F5F5] text-[#111111] relative"
      aria-label="Main Stay Gallery"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column — sticky on desktop */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <span className="eyebrow">05 · Gallery</span>
            <h2 className="font-serif-luxury text-[44px] sm:text-6xl font-medium leading-[0.95]">
              Discover the <span className="font-script font-normal text-[#6B6B6B]">journey</span>
            </h2>

            <div className="space-y-4 text-base text-[#6B6B6B] leading-relaxed max-w-md">
              <p>
                From your room to the first tee — a look at a day at M Stay Hotel in Clark.
              </p>
              <p>
                Spacious studio rooms, home-style conveniences and a short drive to Clark's best golf courses.
              </p>
            </div>

            <button
              onClick={onOpenVirtualTour}
              className="group inline-flex items-center gap-3 pl-2 pr-6 py-2 rounded-full bg-[#111111] hover:bg-[#2B2B2B] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <span className="w-9 h-9 rounded-full bg-white text-[#111111] flex items-center justify-center transition-transform group-hover:scale-110">
                <Play className="w-3.5 h-3.5 fill-[#111111] ml-0.5" />
              </span>
              Launch Virtual Tour
            </button>
          </Reveal>

          {/* Right column: swipe carousel on phones/tablets, stacked story cards on desktop */}
          <div className="lg:col-span-7 min-w-0">
            <div
              ref={railRef}
              onScroll={handleScroll}
              className="-mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 flex lg:flex-col gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-6 sm:scroll-px-8 no-scrollbar"
            >
              {GALLERY_NARRATIVE_ITEMS.map((item) => (
                <Reveal key={item.id} as="article" className="shrink-0 w-[82%] sm:w-[60%] lg:w-auto snap-start">
                  <div
                    onClick={onOpenVirtualTour}
                    className="group h-full cursor-pointer rounded-3xl bg-white p-2.5 hover:shadow-luxury-card transition-shadow duration-500"
                  >
                    <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-[18px] overflow-hidden bg-[#EDEDED]">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={item.focus ? { objectPosition: item.focus } : undefined}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 pb-3 sm:p-7">
                      <h3 className="font-serif-luxury text-[22px] sm:text-3xl font-medium leading-tight">{item.title}</h3>
                      <p className="text-[13px] sm:text-sm text-[#6B6B6B] leading-relaxed mt-2">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Carousel position (phones/tablets only) */}
            <div className="lg:hidden mt-6 flex items-center gap-4">
              <span className="font-mono text-xs tabular-nums text-[#111111]">
                {String(current + 1).padStart(2, '0')}
              </span>
              <div className="relative flex-1 h-px bg-[#D9D9D9]">
                <span
                  className="absolute inset-y-0 left-0 bg-[#111111] transition-[width] duration-300"
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>
              <span className="font-mono text-xs tabular-nums text-[#A3A3A3]">{String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

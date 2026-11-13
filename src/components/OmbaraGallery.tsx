import React from 'react';
import { Play } from 'lucide-react';
import { GALLERY_NARRATIVE_ITEMS } from '../data/ombaraData.ts';
import { Reveal } from './Reveal.tsx';

interface OmbaraGalleryProps {
  onOpenVirtualTour: () => void;
}

export const OmbaraGallery: React.FC<OmbaraGalleryProps> = ({ onOpenVirtualTour }) => {
  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-[#F5F5F5] text-[#111111] relative"
      aria-label="Main Stay Gallery"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column — sticky on desktop */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <span className="eyebrow">05 · Gallery</span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-medium leading-[1]">
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

          {/* Right column — stacked story cards */}
          <div className="lg:col-span-7 space-y-6">
            {GALLERY_NARRATIVE_ITEMS.map((item) => (
              <Reveal key={item.id} as="article">
                <div
                  onClick={onOpenVirtualTour}
                  className="group cursor-pointer rounded-3xl bg-white p-2.5 hover:shadow-luxury-card transition-shadow duration-500"
                >
                  <div className="relative aspect-[16/10] rounded-[18px] overflow-hidden bg-[#EDEDED]">
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
                  <div className="p-5 sm:p-7">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium">{item.title}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mt-2">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

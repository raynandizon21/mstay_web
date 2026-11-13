import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hotelData.ts';

export const PropertyGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <section
      id="gallery"
      className="py-24 lg:py-32 bg-[#FAFAFA] text-[#111111] relative border-t border-[#E6E6E6]"
      aria-label="Property Visual Gallery"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E6E6E6]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E6E6E6] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111] font-semibold">
                Curated Perspectives
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-bold tracking-tight">
              Architecture & <span className="text-[#111111]">Atmosphere.</span>
            </h2>
            <p className="text-sm text-[#6B6B6B] max-w-lg font-normal leading-relaxed">
              Explore the geometric balance, luminous daylight, and bespoke modern furnishings defining Main Stay Hotel.
            </p>
          </div>

          {/* Minimalist Tabs */}
          <div className="flex items-center gap-2 p-1 bg-white border border-[#E6E6E6] shrink-0 overflow-x-auto shadow-xs">
            {[
              { id: 'all', label: 'All Spaces' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'suites', label: 'Suites' },
              { id: 'dining', label: 'Dining' },
              { id: 'wellness', label: 'Wellness' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setLightboxIndex(null);
                }}
                className={`text-[11px] uppercase tracking-[0.16em] font-medium px-4 py-2 transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F2F2F2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid on Clean White Surfaces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative aspect-[4/3] bg-white border border-[#E6E6E6] overflow-hidden cursor-pointer shadow-xs hover:shadow-lg hover:border-[#111111]/40 transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#BFBFBF] font-semibold block">
                  {item.category}
                </span>
                <h3 className="font-heading text-base sm:text-lg text-white group-hover:text-white transition-colors mt-0.5 font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex flex-col justify-between p-6 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#BFBFBF] font-semibold">
                {filteredItems[lightboxIndex].category}
              </span>
              <span className="text-white/20">·</span>
              <span className="font-heading text-lg font-medium">
                {filteredItems[lightboxIndex].title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#A3A3A3] font-mono tabular-nums">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={handleCloseLightbox}
                className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image Viewport */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-10 p-3 bg-black/50 hover:bg-[#111111] text-white rounded-full border border-white/10 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-10 p-3 bg-black/50 hover:bg-[#111111] text-white rounded-full border border-white/10 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center pt-2">
            <p className="text-xs text-white/80 font-normal max-w-lg mx-auto">
              {filteredItems[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

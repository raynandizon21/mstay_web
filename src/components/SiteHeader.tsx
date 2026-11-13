import React, { useState, useEffect } from 'react';
import { Menu, Globe } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface SiteHeaderProps {
  onOpenBooking: () => void;
  onOpenMobileMenu: () => void;
  onNavigate: (sectionId: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onOpenBooking,
  onOpenMobileMenu,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'EN' | 'FR' | 'JA'>('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Suites', id: 'accommodation' },
    { label: 'Dining', id: 'dining' },
    { label: 'Wellness', id: 'wellness' },
    { label: 'Experiences', id: 'experiences' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Location', id: 'location' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E6E6E6] py-3.5 shadow-xs'
          : 'bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#E6E6E6] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Main Stay Hotel Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            aria-label="Main Stay Hotel"
          >
            <BrandLogo size="md" variant="full" />
          </a>

          {/* Zone 2: Modern Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-medium"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-[#4D4D4D] hover:text-[#111111] transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 relative group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#111111] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Zone 3: Language & Modern Reservation Action */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Language dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#111111] py-1.5 px-3 rounded-xs border border-[#D9D9D9] bg-white transition-colors cursor-pointer"
                aria-expanded={langMenuOpen}
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-[#111111]" />
                <span className="font-semibold tracking-wider">{currentLang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-[#D9D9D9] shadow-lg py-1 z-50 rounded-xs">
                  {(['EN', 'FR', 'JA'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs tracking-wider transition-colors cursor-pointer ${
                        currentLang === lang
                          ? 'text-[#111111] bg-[#F5F5F5] font-semibold'
                          : 'text-[#4D4D4D] hover:bg-[#FAFAFA]'
                      }`}
                    >
                      {lang === 'EN' ? 'English' : lang === 'FR' ? 'Français' : '日本語'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modern Cobalt Reserve Button */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-bold text-white bg-[#111111] hover:bg-[#3A3A3A] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              Reserve A Room
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 text-[#111111] hover:text-[#111111] transition-colors cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

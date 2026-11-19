import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { OmbaraLogo } from './OmbaraLogo.tsx';
import { HOTEL_INFO } from '../data/ombaraData.ts';

interface OmbaraHeaderProps {
  onOpenRegister: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenVirtualTour: () => void;
}

export const OmbaraHeader: React.FC<OmbaraHeaderProps> = ({
  onOpenRegister,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll while the mobile drawer is open; close it on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', id: 'experience' },
    { label: 'Explore Clark', id: 'usps' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Rooms', id: 'rooms' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-white/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] pl-6 pr-2 py-2'
              : 'bg-transparent border border-transparent px-2 py-2'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="cursor-pointer transition-opacity hover:opacity-80"
            aria-label="Main Stay Hotel — Home"
          >
            <OmbaraLogo size="sm" inverted={!isScrolled} />
          </button>

          {/* Centered navigation */}
          <nav
            className={`hidden lg:flex items-center gap-1 text-[13px] font-medium ${
              isScrolled ? 'text-[#4D4D4D]' : 'text-white/85'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled ? 'hover:bg-black/5 hover:text-[#111111]' : 'hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRegister}
              className={`hidden sm:inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer group ${
                isScrolled
                  ? 'bg-[#111111] text-white hover:bg-[#2B2B2B]'
                  : 'bg-white text-[#111111] hover:bg-[#F2F2F2]'
              }`}
            >
              Book a Stay
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 ${
                  isScrolled ? 'bg-white text-[#111111]' : 'bg-[#111111] text-white'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 lg:hidden rounded-full cursor-pointer transition-colors ${
                isScrolled ? 'text-[#111111] hover:bg-black/5' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: full-screen editorial overlay */}
      <div
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] lg:hidden bg-[#0B0B0B] text-white grain transition-[opacity,visibility] duration-500 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative h-full overflow-y-auto flex flex-col px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <OmbaraLogo size="sm" inverted />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/85 hover:bg-white hover:text-[#111111] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="mt-12 flex-1">
            <span className="eyebrow !text-white/40">Menu</span>
            <ul className="mt-6">
              {navLinks.map((link, i) => (
                <li
                  key={link.label}
                  className={`border-b border-white/10 transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                    mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? `${120 + i * 60}ms` : '0ms' }}
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(link.id);
                    }}
                    className="group w-full flex items-baseline gap-5 text-left py-4"
                  >
                    <span className="font-mono text-[11px] text-white/35 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-serif-luxury text-[34px] leading-none font-medium tracking-tight transition-transform duration-300 group-active:translate-x-1">
                      {link.label}
                    </span>
                    <ArrowUpRight className="ml-auto self-center w-4 h-4 text-white/30 transition-colors group-hover:text-white" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`mt-10 space-y-5 transition-all duration-700 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: mobileMenuOpen ? '520ms' : '0ms' }}
          >
            <div className="grid grid-cols-2 gap-4 text-xs">
              {HOTEL_INFO.phones.slice(0, 2).map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="block">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40">{p.label}</span>
                  <span className="block mt-1 text-sm text-white/85 tabular-nums">{p.display}</span>
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="group w-full inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-white text-[#111111] text-sm font-semibold"
            >
              Book a Stay
              <span className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

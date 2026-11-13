import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { OmbaraLogo } from './OmbaraLogo.tsx';

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

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div
          className={`absolute inset-y-3 right-3 w-[calc(100%-1.5rem)] max-w-sm bg-white rounded-3xl p-7 flex flex-col justify-between shadow-2xl transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E6]">
              <OmbaraLogo size="sm" inverted={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-[#F2F2F2] text-[#111111] hover:bg-[#E6E6E6]"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="mt-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(link.id);
                  }}
                  className="w-full flex items-baseline gap-4 text-left py-3 border-b border-[#F2F2F2] group"
                >
                  <span className="font-serif-luxury text-2xl font-medium text-[#111111] group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full py-4 rounded-full bg-[#111111] hover:bg-[#2B2B2B] text-white text-sm font-semibold transition-colors"
          >
            Book a Stay
          </button>
        </div>
      </div>
    </>
  );
};

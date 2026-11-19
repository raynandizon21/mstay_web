import React, { useCallback, useState } from 'react';
import { OmbaraHeader } from './components/OmbaraHeader.tsx';
import { OmbaraHero } from './components/OmbaraHero.tsx';
import { OmbaraRoomSearch } from './components/OmbaraRoomSearch.tsx';
import { OmbaraExperience } from './components/OmbaraExperience.tsx';
import { OmbaraUSPs } from './components/OmbaraUSPs.tsx';
import { OmbaraFacilities } from './components/OmbaraFacilities.tsx';
import { OmbaraResidences } from './components/OmbaraResidences.tsx';
import { OmbaraGallery } from './components/OmbaraGallery.tsx';
import { OmbaraFooter } from './components/OmbaraFooter.tsx';
import { OmbaraVirtualTourModal } from './components/OmbaraVirtualTourModal.tsx';
import { OmbaraRegisterModal } from './components/OmbaraRegisterModal.tsx';
import { IntroLoader } from './components/IntroLoader.tsx';
import { ResidenceItem, ExperienceItem } from './data/ombaraData.ts';

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [_selectedResidence, setSelectedResidence] = useState<ResidenceItem | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectResidence = (residence: ResidenceItem) => {
    setSelectedResidence(residence);
    setRegisterModalOpen(true);
  };

  const handleSelectExperience = (_exp: ExperienceItem) => {
    setVirtualTourOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-white">
      {/* 0. Opening logo animation (once per session) */}
      <IntroLoader onDone={handleIntroDone} />

      {/* 1. Header with Transparent Hero Mode & Sticky Scrolled Mode */}
      <OmbaraHeader
        onOpenRegister={() => setRegisterModalOpen(true)}
        onNavigate={handleNavigate}
        onOpenVirtualTour={() => setVirtualTourOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Screenshot 1) */}
        <OmbaraHero
          ready={introDone}
          onRegisterClick={() => setRegisterModalOpen(true)}
          onExploreClick={() => handleNavigate('experience')}
        />

        {/* Room search bar (check-in / checkout / nights / rooms) */}
        <OmbaraRoomSearch onBook={() => setRegisterModalOpen(true)} />

        {/* 3. The Experience Section (Screenshot 2) */}
        <OmbaraExperience onSelectExperience={handleSelectExperience} />

        {/* 4. Exclusive Features / USPs Section (Screenshot 3) */}
        <OmbaraUSPs />

        {/* 5. Our Facilities Section (Screenshots 4 & 5) */}
        <OmbaraFacilities />

        {/* 6. Residences / Luxurious Stays Section (Screenshot 6) */}
        <OmbaraResidences onSelectResidence={handleSelectResidence} />

        {/* 7. Gallery / Discover the Ombak Experience (Screenshots 7, 8, 9) */}
        <OmbaraGallery onOpenVirtualTour={() => setVirtualTourOpen(true)} />
      </main>

      {/* 8. Footer */}
      <OmbaraFooter
        onNavigate={handleNavigate}
        onOpenRegister={() => setRegisterModalOpen(true)}
        onOpenVirtualTour={() => setVirtualTourOpen(true)}
      />

      {/* 9. Interactive Fullscreen Story Tour Modal (Screenshots 10 & 11) */}
      <OmbaraVirtualTourModal
        isOpen={virtualTourOpen}
        onClose={() => setVirtualTourOpen(false)}
      />

      {/* 10. Register Modal */}
      <OmbaraRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
}
                                                                                   
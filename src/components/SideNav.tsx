'use client';

import { useState, useEffect, useRef } from 'react';
import { Home, LayoutGrid, BriefcaseBusiness, User } from 'lucide-react';

type Section = {
  id: string;
  label: string;
};

type SideNavProps = {
  sections: Section[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

const iconMap = {
  intro: Home,
  projects: LayoutGrid,
  resume: BriefcaseBusiness,
  contact: User,
};

export function SideNav({ sections, activeSection, onNavigate }: SideNavProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const lastScrollY = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide during programmatic scrolling
      if (isProgrammaticScroll.current) {
        lastScrollY.current = currentScrollY;
        return;
      }
      
      if (currentScrollY < 50) {
        // Always show at top
        setShowMobileNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowMobileNav(false);
      } else if (lastScrollY.current - currentScrollY > 10) {
        // Scrolling up with some threshold
        setShowMobileNav(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (programmaticScrollTimeout.current) {
        clearTimeout(programmaticScrollTimeout.current);
      }
    };
  }, []);

  const handleClick = (sectionId: string) => {
    // Mark as programmatic scroll
    isProgrammaticScroll.current = true;
    setShowMobileNav(true);
    
    // Clear any existing timeout
    if (programmaticScrollTimeout.current) {
      clearTimeout(programmaticScrollTimeout.current);
    }
    
    // Re-enable scroll detection after animation completes
    programmaticScrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      lastScrollY.current = window.scrollY;
    }, 1000);
    
    onNavigate(sectionId);
  };

  return (
    <>
      {/* Desktop Navigation - Left Side with Glassmorphic Style */}
      <nav className="pointer-events-none fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 md:inline-flex">
        <div 
          className="pointer-events-auto flex flex-col gap-2"
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;
            const Icon = iconMap[section.id as keyof typeof iconMap] || Home;
            const showLabel = isHovered;

            return (
              <button
                key={section.id}
                type="button"
                className="group relative flex items-center justify-center"
                aria-label={section.label}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div
                  className={`
                    flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-black/90 text-white' 
                      : 'text-gray-700 hover:bg-gray-200/60 hover:text-gray-900'
                    }
                    ${!isMenuHovered ? 'scale-90' : 'scale-100'}
                  `}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                
                {showLabel && (
                  <span
                    className="pointer-events-none absolute left-full top-1/2 ml-3 flex items-center whitespace-nowrap rounded-full bg-black/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
                    style={{
                      animation: 'fadeInSlide 200ms ease-out forwards',
                    }}
                  >
                    {section.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className={`
        pointer-events-none fixed bottom-0 left-0 right-0 z-50 inline-flex md:hidden
        transition-transform duration-500 ease-in-out
        ${showMobileNav ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="pointer-events-auto mx-auto mb-3 flex gap-1 rounded-full bg-gray-100/25 px-2 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-xl border border-white/20">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const Icon = iconMap[section.id as keyof typeof iconMap] || Home;

            return (
              <button
                key={section.id}
                type="button"
                className="group relative flex flex-col items-center justify-center"
                aria-label={section.label}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handleClick(section.id)}
              >
                <div
                  className={`
                    flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-black/90 text-white scale-105' 
                      : 'text-gray-700 active:bg-white/40 active:backdrop-blur-sm'
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={2} />
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

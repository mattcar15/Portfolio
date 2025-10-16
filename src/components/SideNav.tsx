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
  const [targetSection, setTargetSection] = useState<string | null>(null);
  
  // Use target section during navigation, otherwise follow active section
  const displaySection = targetSection || activeSection;
  const activeIndex = sections.findIndex(section => section.id === displaySection);

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
    // Mark as programmatic scroll and lock indicator to target
    isProgrammaticScroll.current = true;
    setTargetSection(sectionId);
    setShowMobileNav(true);
    
    // Clear any existing timeout
    if (programmaticScrollTimeout.current) {
      clearTimeout(programmaticScrollTimeout.current);
    }
    
    // Re-enable scroll detection and unlock indicator after animation completes
    programmaticScrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      setTargetSection(null);
      lastScrollY.current = window.scrollY;
    }, 1000); // Slightly longer than the 500ms animation for smooth transition
    
    onNavigate(sectionId);
  };

  return (
    <>
      {/* Desktop Navigation - Left Side with Glassmorphic Style */}
      <nav className="pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:inline-flex">
        <div 
          className="pointer-events-auto relative flex flex-col gap-2"
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {/* Hover circle - appears on hover but hidden under active indicator */}
          {hoveredSection && hoveredSection !== displaySection && (
            <div
              className="absolute left-0 h-11 w-11 rounded-full bg-gray-200/60 transition-all duration-300 z-0"
              style={{
                transform: `translateY(${sections.findIndex(s => s.id === hoveredSection) * (44 + 8)}px)`,
              }}
            />
          )}
          
          {/* Gliding indicator - sits above hover circle */}
          <div
            className="absolute left-0 h-11 w-11 rounded-full bg-black/90 z-10"
            style={{
              transform: `translateY(${activeIndex * (44 + 8)}px) scale(${isMenuHovered ? 1 : 0.9})`,
              transition: 'transform 800ms ease-out',
            }}
          />
          
          {/* White icons layer - clipped by circle - MUST BE ON TOP */}
          <div
            className="absolute left-0 top-0 flex flex-col gap-2 pointer-events-none z-30"
            style={{
              clipPath: `circle(${isMenuHovered ? 22 : 19.8}px at 22px ${activeIndex * (44 + 8) + 22}px)`,
              transition: 'clip-path 800ms ease-out',
            }}
          >
            {sections.map((section) => {
              const Icon = iconMap[section.id as keyof typeof iconMap] || Home;
              return (
                <div
                  key={section.id}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-white"
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
              );
            })}
          </div>
          
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
                  className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-all duration-300"
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
        pointer-events-none fixed bottom-0 left-0 right-0 z-30 inline-flex lg:hidden
        transition-transform duration-500 ease-in-out
        ${showMobileNav ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="pointer-events-auto relative mx-auto mb-3 flex gap-1 rounded-full bg-gray-100/25 px-2 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-xl border border-white/20">
          {/* Gliding indicator for mobile */}
          <div
            className="absolute left-2 top-1.5 h-11 w-11 rounded-full bg-black/90 z-10"
            style={{
              transform: `translateX(${activeIndex * (44 + 4)}px) scale(1.05)`,
              transition: 'transform 500ms ease-out',
            }}
          />
          
          {/* White icons layer - clipped by circle - MUST BE ON TOP */}
          <div
            className="absolute left-2 top-1.5 flex gap-1 pointer-events-none z-30"
            style={{
              clipPath: `circle(23px at ${activeIndex * (44 + 4) + 22}px 22px)`,
              transition: 'clip-path 500ms ease-out',
            }}
          >
            {sections.map((section) => {
              const Icon = iconMap[section.id as keyof typeof iconMap] || Home;
              return (
                <div
                  key={section.id}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-white"
                >
                  <Icon size={19} strokeWidth={2} />
                </div>
              );
            })}
          </div>
          
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
                  className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-all duration-300"
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

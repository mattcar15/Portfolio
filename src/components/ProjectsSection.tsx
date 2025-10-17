'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export type Project = {
  id: number;
  title: string;
  description: string;
  type: string;
  gradient: string;
  gradientStops?: string[];
  tags: string[];
  height: string;
  component: React.ComponentType;
};

type ProjectsSectionProps = {
  projects: Project[];
};

type TilePosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const ANIMATION_DURATION = 300;
const HEADER_HEIGHT = 182;

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const cardRefs = useRef<Record<number, HTMLElement | null>>({});
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [tilePosition, setTilePosition] = useState<TilePosition | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ 
    width: 0, 
    height: 0 
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const bodyScrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isGrowthPhase, setIsGrowthPhase] = useState(true); // true = growing/collapsing, false = scrolling
  const [isMounted, setIsMounted] = useState(false);

  // Initialize window size on mount to avoid hydration mismatch
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    setIsMounted(true);
  }, []);

  // Reorder projects for column layout to achieve left-to-right, top-to-bottom visual order
  const reorderedProjects = useMemo(() => {
    const getColumnCount = () => {
      // Use a safe default of 3 columns until mounted
      if (!isMounted || windowSize.width === 0) return 3;
      const width = windowSize.width;
      if (width < 768) return 1;
      if (width < 1024) return 2;
      return 3;
    };

    const numCols = getColumnCount();
    const itemsPerCol = Math.ceil(projects.length / numCols);
    const reordered = new Array(projects.length);

    projects.forEach((project, visualIndex) => {
      const visualRow = Math.floor(visualIndex / numCols);
      const visualCol = visualIndex % numCols;
      const physicalIndex = visualCol * itemsPerCol + visualRow;

      if (physicalIndex < projects.length) {
        reordered[physicalIndex] = project;
      }
    });

    return reordered.filter(Boolean);
  }, [projects, windowSize.width, isMounted]);

  const handleOpenProject = useCallback(
    (project: Project, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      setTilePosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      setActiveProject(project);
      setIsAnimating(false);
      setShowBody(false);
      setScrollProgress(0);
      setIsGrowthPhase(true);
      
      // Lock scroll and hide scrollbar
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--sbw', `${scrollbarWidth}px`);
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = `var(--sbw)`;
      document.body.style.overflow = 'clip';
      
      // Trigger animation after brief delay
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      
      // Trigger body slide-in after card starts expanding
      setTimeout(() => {
        setShowBody(true);
      }, 60);
    },
    []
  );

  const handleCloseProject = useCallback(() => {
    // Hide body first
    setShowBody(false);
    
    // Then trigger the shrink animation after a brief delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 50);
    
    // Clean up after animation
    setTimeout(() => {
      // Restore scroll position and body styles
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.removeAttribute('style');
      document.body.removeAttribute('data-scroll-y');
      window.scrollTo(0, scrollY);
      
      setActiveProject(null);
      setTilePosition(null);
    }, ANIMATION_DURATION + 50);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleCloseProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, handleCloseProject]);

  // Measure content height when active project changes or window resizes
  useEffect(() => {
    if (!activeProject || !measureRef.current) {
      setContentHeight(null);
      return;
    }

    // Wait for next frame to ensure content is rendered
    requestAnimationFrame(() => {
      if (measureRef.current) {
        const bodyHeight = measureRef.current.scrollHeight;
        const headerHeight = HEADER_HEIGHT; // Fixed header height
        const totalHeight = headerHeight + bodyHeight;
        setContentHeight(totalHeight);
      }
    });
  }, [activeProject, windowSize]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      // Update tile position if there's an active project
      if (activeProject && cardRefs.current[activeProject.id]) {
        const element = cardRefs.current[activeProject.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          setTilePosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeProject]);

  // Handle wheel events for growth phase and transition to scroll phase
  useEffect(() => {
    const modalElement = modalRef.current;
    const bodyScrollElement = bodyScrollRef.current;
    if (!modalElement || !bodyScrollElement || !showBody) return;

    const handleWheel = (e: WheelEvent) => {
      if (isGrowthPhase) {
        // Growth phase: adjust scroll progress instead of scrolling
        e.preventDefault();
        
        setScrollProgress((prev) => {
          const delta = e.deltaY / 100; // Normalize scroll speed
          const newProgress = Math.max(0, Math.min(1, prev + delta * 0.5));
          
          // Transition to scroll phase when fully collapsed
          if (newProgress >= 1 && delta > 0) {
            setIsGrowthPhase(false);
          }
          
          return newProgress;
        });
      } else {
        // Scroll phase: check if we need to transition back to growth phase
        const scrollTop = bodyScrollElement.scrollTop;
        if (scrollTop === 0 && e.deltaY < 0) {
          // Scrolling up at the top, transition back to growth phase
          e.preventDefault();
          setIsGrowthPhase(true);
        }
      }
    };

    modalElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => modalElement.removeEventListener('wheel', handleWheel);
  }, [showBody, isGrowthPhase]);

  // Handle scroll in body section during scroll phase
  useEffect(() => {
    const bodyScrollElement = bodyScrollRef.current;
    if (!bodyScrollElement || !showBody || isGrowthPhase) return;

    const handleScroll = () => {
      const scrollTop = bodyScrollElement.scrollTop;
      
      // If scrolled to top, maintain collapsed state
      if (scrollTop === 0) {
        // Keep progress at 1 when at top in scroll phase
        setScrollProgress(1);
      }
    };

    bodyScrollElement.addEventListener('scroll', handleScroll);
    return () => bodyScrollElement.removeEventListener('scroll', handleScroll);
  }, [showBody, isGrowthPhase]);

  const getPopoverStyle = () => {
    if (!tilePosition) return {};

    // Use safe defaults if window size hasn't been measured yet
    const safeWidth = windowSize.width || (typeof window !== 'undefined' ? window.innerWidth : 1024);
    const safeHeight = windowSize.height || (typeof window !== 'undefined' ? window.innerHeight : 768);

    const horizontalMargin = safeWidth < 640 ? 16 : 28;
    const verticalMargin = safeHeight < 800 ? 20 : 32;

    const maxWidth = Math.min(safeWidth - horizontalMargin * 2, 1040);
    
    // Use measured content height if available, otherwise fall back to a reasonable default
    const idealHeight = contentHeight ?? 800;
    const maxHeight = Math.max(
      Math.min(safeHeight - verticalMargin * 2, idealHeight),
      420
    );

    const targetLeft = (safeWidth - maxWidth) / 2;
    const targetTop = Math.max(verticalMargin, (safeHeight - maxHeight) / 2);

    if (!isAnimating) {
      return {
        top: `${tilePosition.top}px`,
        left: `${tilePosition.left}px`,
        width: `${tilePosition.width}px`,
        height: `${tilePosition.height}px`,
      };
    }

    return {
      top: `${targetTop}px`,
      left: `${targetLeft}px`,
      width: `${maxWidth}px`,
      height: `${maxHeight}px`,
    };
  };

  return (
    <section id="projects" className="min-h-screen py-32 px-6 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold mb-16 text-black">Projects</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reorderedProjects.map((project) => {
            const stops = project.gradientStops ?? [];
            const gradientStyle =
              stops.length >= 2
                ? { background: `linear-gradient(135deg, ${stops.join(', ')})` }
                : undefined;
            
            return (
              <div key={project.id}>
                {activeProject?.id === project.id ? (
                  <div 
                    ref={(node) => { cardRefs.current[project.id] = node; }}
                    className={`relative ${project.height} rounded-3xl mb-6 break-inside-avoid pointer-events-none`} 
                  />
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleOpenProject(project, e.currentTarget)}
                    aria-label={`View details for ${project.title}`}
                    ref={(node) => { cardRefs.current[project.id] = node; }}
                    className={`group block w-full overflow-hidden bg-slate-950/5 focus-visible:outline-none cursor-pointer relative ${project.height} rounded-3xl mb-6 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.01] hover:shadow-[0_28px_48px_-26px_rgba(15,23,42,0.38)] focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 break-inside-avoid`}
                  >
                    <div
                      className={`absolute inset-0 pointer-events-none ${
                        gradientStyle ? '' : `bg-gradient-to-br ${project.gradient}`
                      } transition-transform duration-700 group-hover:scale-110`}
                      style={gradientStyle}
                    />
                    <div className="relative h-full p-10 flex flex-col justify-end text-left text-white">
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {project.tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm uppercase tracking-[0.18em]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-semibold text-white mb-4 text-4xl">
                        {project.title}
                      </h3>

                      <p className="text-lg text-white/80 leading-relaxed mb-10">{project.description}</p>

                      <div className="group/view inline-flex items-center gap-2 text-white font-semibold transition-transform duration-500">
                        <span className="transition-transform duration-500">View details</span>
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover/view:translate-x-1" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Backdrop - covers full viewport including where scrollbar was */}
      {activeProject && tilePosition && (
        <>
          <div 
            className="fixed top-0 left-0 z-40 transition-opacity duration-300"
            style={{
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(8px)',
              opacity: isAnimating ? 1 : 0
            }}
            onClick={handleCloseProject}
            aria-label="Close modal"
          />
          
          <div
            ref={modalRef}
            className="fixed z-50 transition-all duration-300 ease-out overflow-hidden rounded-3xl"
            style={getPopoverStyle()}
          >
            <div className="w-full h-full relative flex flex-col">
              {/* Gradient background */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  activeProject.gradientStops && activeProject.gradientStops.length >= 2
                    ? ''
                    : `bg-gradient-to-br ${activeProject.gradient}`
                }`}
                style={
                  activeProject.gradientStops && activeProject.gradientStops.length >= 2
                    ? { background: `linear-gradient(135deg, ${activeProject.gradientStops.join(', ')})` }
                    : undefined
                }
              />
              
              {/* Content */}
              <div className="relative h-full flex flex-col">
                {isAnimating && (
                  <>
                    <button
                      type="button"
                      onClick={handleCloseProject}
                      className="absolute top-6 right-6 z-10 rounded-full border border-white/40 bg-white/60 p-2 text-slate-800 transition-opacity duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/40"
                      style={{ opacity: showBody ? 1 : 0 }}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-5 w-5" />
                    </button>

                    <div className="flex flex-col h-full">
                      {/* Spacer that pushes content down when body is hidden */}
                      <div 
                        style={{ 
                          flex: showBody ? '0 0 0px' : '1 1 0%',
                          transition: 'flex 0.3s ease-out'
                        }}
                      />
                      
                      <div 
                        className="text-white flex-shrink-0 px-10 py-10"
                        style={{ 
                          paddingTop: `${40 - scrollProgress * 24}px`,
                          paddingBottom: `${40 - scrollProgress * 24}px`,
                          willChange: scrollProgress > 0 && scrollProgress < 1 ? 'padding' : 'auto'
                        }}
                      >
                        <div 
                          className="flex gap-2 mb-6 flex-wrap overflow-hidden origin-top"
                          style={{
                            transform: `scaleY(${1 - scrollProgress})`,
                            opacity: 1 - scrollProgress,
                            height: scrollProgress >= 0.99 ? '0px' : 'auto',
                            marginBottom: scrollProgress >= 0.99 ? '0px' : '24px',
                            willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform, opacity' : 'auto'
                          }}
                        >
                          {activeProject.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm uppercase tracking-[0.18em]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 
                          className="font-semibold text-white origin-top"
                          style={{ 
                            marginBottom: showBody ? '0' : '1rem',
                            fontSize: `${(windowSize.width || 1024) >= 768 ? 48 : 36}px`,
                            transform: `scale(${1 - (scrollProgress * 0.25)})`,
                            transformOrigin: 'left top',
                            willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform' : 'auto'
                          }}
                        >
                          {activeProject.title}
                        </h3>

                        <div 
                          className="overflow-hidden"
                          style={{ 
                            maxHeight: showBody ? '0px' : '500px',
                            opacity: showBody ? 0 : 1,
                            marginTop: showBody ? '0' : '0',
                            transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out'
                          }}
                        >
                          <p className="text-lg text-white/80 leading-relaxed mb-10 mt-4">
                            {activeProject.description}
                          </p>

                          <div className="inline-flex items-center gap-2 text-white font-semibold">
                            <span>View details</span>
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="absolute inset-x-0 bottom-0 overflow-hidden"
                      style={{ 
                        height: showBody ? `calc(100% - ${HEADER_HEIGHT - scrollProgress * 96}px)` : '0%',
                        opacity: showBody ? 1 : 0,
                        transition: (isGrowthPhase && scrollProgress > 0) ? 'none' : 'height 0.3s ease-out, opacity 0.3s ease-out'
                      }}
                    >
                      <div className="h-full overflow-hidden rounded-t-3xl bg-white text-slate-900 shadow-[0_-12px_30px_rgba(15,23,42,0.08)]">
                        <div 
                          ref={bodyScrollRef}
                          className={`h-full px-8 py-8 md:px-12 md:py-12 ${isGrowthPhase ? 'overflow-hidden' : 'overflow-y-auto'}`}
                        >
                          <activeProject.component />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!isAnimating && (
                  <div className="p-10 flex flex-col justify-end h-full text-white">
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {activeProject.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm uppercase tracking-[0.18em]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-semibold text-white mb-4 text-4xl">
                      {activeProject.title}
                    </h3>

                    <p className="text-lg text-white/80 leading-relaxed mb-10">{activeProject.description}</p>

                    <div className="inline-flex items-center gap-2 text-white font-semibold">
                      <span>View details</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hidden measurement container - renders body content off-screen to measure height */}
      {activeProject && (
        <div 
          className="fixed pointer-events-none opacity-0"
          style={{
            left: '-9999px',
            top: 0,
            width: `${Math.min((windowSize.width || 1024) - ((windowSize.width || 1024) < 640 ? 32 : 56), 1040)}px`,
          }}
        >
          <div 
            ref={measureRef}
            className="overflow-hidden rounded-t-3xl bg-white text-slate-900"
          >
            <div className="px-8 py-8 md:px-12 md:py-12">
              <activeProject.component />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

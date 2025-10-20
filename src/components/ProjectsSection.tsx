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
  const [isExpanded, setIsExpanded] = useState(false); // Controls card size
  const [showBody, setShowBody] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ 
    width: 0, 
    height: 0 
  });
  const bodyScrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [modalDimensions, setModalDimensions] = useState({ width: 0, height: 0 });
  const [lockedContentWidth, setLockedContentWidth] = useState<number | null>(null);

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
      setLockedContentWidth(rect.width);
      
      setActiveProject(project);
      setIsAnimating(false);
      setIsExpanded(false);
      setShowBody(false);
      
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
        setIsExpanded(true);
      }, 10);
      
      // Trigger body slide-in after card starts expanding
      setTimeout(() => {
        setShowBody(true);
      }, 60);
    },
    []
  );

  const handleCloseProject = useCallback(() => {
    // Hide body first - this triggers white overlay to slide down
    setShowBody(false);
    
    // Trigger card shrink almost immediately so it happens simultaneously with white overlay sliding down
    setTimeout(() => {
      setIsExpanded(false);
    }, 50);
    
    // Hide content after white overlay has slid down (0.3s)
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    // Clean up after all animations complete
    setTimeout(() => {
      // Restore scroll position and body styles
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.removeAttribute('style');
      document.body.removeAttribute('data-scroll-y');
      window.scrollTo(0, scrollY);
      
      setActiveProject(null);
      setTilePosition(null);
      setLockedContentWidth(null);
    }, 300 + ANIMATION_DURATION + 50);
  }, [activeProject]);

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
          setLockedContentWidth(rect.width);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeProject]);

  // Track modal dimensions for hole punch effect
  useEffect(() => {
    if (!modalRef.current || !isExpanded) return;

    const updateModalDimensions = () => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        setModalDimensions({ width: rect.width, height: rect.height });
      }
    };

    // Initial measurement
    updateModalDimensions();

    // Update on animation frame for smooth transitions
    const animationId = requestAnimationFrame(updateModalDimensions);

    return () => cancelAnimationFrame(animationId);
  }, [isExpanded, windowSize]);

  // No longer needed - removed growth phase scroll behavior

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

    if (!isExpanded) {
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
        <h2 className="text-6xl md:text-7xl font-bold mb-16">Projects</h2>

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
                        <ArrowUpRight
                          className="w-5 h-5 transition-transform duration-500 group-hover/view:translate-x-1"
                        />
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
            className="fixed top-0 left-0 z-40 transition-opacity"
            style={{
              transitionDuration: '300ms',
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(8px)',
              opacity: isExpanded ? 1 : 0
            }}
            onClick={handleCloseProject}
            aria-label="Close modal"
          />
          
          <div
            ref={modalRef}
            className="fixed z-50 transition-all ease-out overflow-hidden rounded-3xl"
            style={{
              ...getPopoverStyle(),
              transitionDuration: '300ms'
            }}
          >
            <div className="w-full h-full relative flex flex-col overflow-hidden">
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
              
              {/* Content - fixed width to prevent reflow during animation */}
              <div 
                className="relative h-full flex flex-col mx-auto"
                style={{
                  width: '100%'
                }}
              >
                {isAnimating && (
                  <>
                    <button
                      type="button"
                      onClick={handleCloseProject}
                      className="absolute top-6 right-6 z-10 rounded-full border border-white/40 bg-white/60 p-2 text-slate-800 transition-opacity hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/40"
                      style={{ 
                        opacity: showBody ? 1 : 0,
                        transition: 'opacity 0.6s ease-out 0.8s'
                      }}
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
                          opacity: showBody ? 0 : 1,
                          transition: 'opacity 0.8s ease-out',
                          width: lockedContentWidth ? `${lockedContentWidth}px` : '100%',
                          alignSelf: 'flex-start'
                        }}
                      >
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

                        <h3 
                          className="font-semibold text-white mb-4"
                          style={{ 
                            fontSize: `${(windowSize.width || 1024) >= 768 ? 48 : 36}px`
                          }}
                        >
                          {activeProject.title}
                        </h3>

                        <div className="overflow-hidden">
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
                        height: showBody ? '100%' : '0%',
                        transition: 'height 0.3s ease-out',
                        pointerEvents: showBody ? 'auto' : 'none'
                      }}
                    >
                      <div className="h-full overflow-hidden rounded-3xl bg-white text-slate-900 shadow-[0_-12px_30px_rgba(15,23,42,0.08)]">
                        <div 
                          ref={bodyScrollRef}
                          className="h-full overflow-y-auto"
                          style={{
                            opacity: showBody ? 1 : 0,
                            transition: 'opacity 0.6s ease-out 0.4s'
                          }}
                        >
                          {/* Hole punch title - positioned to align gradient with modal background */}
                          <div 
                            className="relative px-10 py-10 pb-8"
                          >
                            <h3 
                              className="font-semibold relative"
                              style={{ 
                                fontSize: `${(windowSize.width || 1024) >= 768 ? 48 : 36}px`
                              }}
                            >
                              {/* Gradient background layer that matches modal's gradient position */}
                              <span 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: activeProject.gradientStops && activeProject.gradientStops.length >= 2
                                    ? `linear-gradient(135deg, ${activeProject.gradientStops.join(', ')})`
                                    : undefined,
                                  backgroundSize: modalDimensions.width > 0 
                                    ? `${modalDimensions.width}px ${modalDimensions.height}px`
                                    : '100% 100%',
                                  backgroundPosition: '-40px -40px',
                                  WebkitBackgroundClip: 'text',
                                  backgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  color: 'transparent',
                                }}
                              >
                                {activeProject.title}
                              </span>
                              {/* Hidden text for proper layout */}
                              <span className="invisible">
                                {activeProject.title}
                              </span>
                            </h3>
                          </div>

                          <div className="px-4 sm:px-10 pb-10">
                            <activeProject.component />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!isAnimating && (
                  <div 
                    className="p-10 flex flex-col justify-end h-full text-white"
                    style={{
                      width: lockedContentWidth ? `${lockedContentWidth}px` : '100%',
                      alignSelf: 'flex-start'
                    }}
                  >
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
            width: `${Math.min(
              (windowSize.width || 1024) - ((windowSize.width || 1024) < 640 ? 32 : 56),
              1040
            )}px`,
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

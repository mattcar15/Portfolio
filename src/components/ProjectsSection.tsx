'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
};

type ProjectsSectionProps = {
  projects: Project[];
};

type RectSnapshot = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type PanelFrame = RectSnapshot & { borderRadius: number };

const ANIMATION_DURATION = 420;
const ANIMATION_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const CARD_BORDER_RADIUS = 28;
const OVERLAY_BORDER_RADIUS = 36;

function computeFinalFrame(): PanelFrame {
  if (typeof window === 'undefined') {
    return { top: 0, left: 0, width: 0, height: 0, borderRadius: OVERLAY_BORDER_RADIUS };
  }

  const horizontalMargin = window.innerWidth < 640 ? 16 : 28;
  const verticalMargin = window.innerHeight < 800 ? 20 : 32;

  const maxWidth = Math.min(window.innerWidth - horizontalMargin * 2, 1040);
  const maxHeight = Math.max(
    Math.min(window.innerHeight - verticalMargin * 2, 820),
    420
  );

  const left = (window.innerWidth - maxWidth) / 2;
  const top = Math.max(verticalMargin, (window.innerHeight - maxHeight) / 2);

  return {
    top,
    left,
    width: maxWidth,
    height: maxHeight,
    borderRadius: OVERLAY_BORDER_RADIUS,
  };
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedProjectId = searchParams.get('project');

  const selectedProject = useMemo(
    () => {
      const found = projects.find((project) => String(project.id) === selectedProjectId);
      console.log('[SELECTED PROJECT CHANGED]', {
        selectedProjectId,
        found: found?.id,
      });
      return found;
    },
    [projects, selectedProjectId]
  );

  const cardRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [originFrame, setOriginFrame] = useState<PanelFrame | null>(null);
  const [panelFrame, setPanelFrame] = useState<PanelFrame | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closingProjectId, setClosingProjectId] = useState<number | null>(null);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const handleOpenProject = useCallback(
    (projectId: number) => {
      if (typeof window !== 'undefined') {
        const element = cardRefs.current[projectId];
        if (element) {
          const rect = element.getBoundingClientRect();
          const origin: PanelFrame = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: CARD_BORDER_RADIUS,
          };
          setOriginFrame(origin);
          setPanelFrame(origin);
        }
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set('project', String(projectId));
      const query = params.toString();
      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleCloseProject = useCallback(() => {
    if (!selectedProject) return;
    
    console.log('[CLOSE] Starting close animation for project:', selectedProject.id);
    console.log('[CLOSE] Origin frame:', originFrame);
    
    setContentVisible(false);
    setBackdropVisible(false);
    setIsClosing(true);
    setClosingProjectId(selectedProject.id);
    
    if (originFrame) {
      console.log('[CLOSE] Setting panel frame back to origin:', originFrame);
      setPanelFrame(originFrame);
    }

    // Clear URL immediately, but keep state for animation
    const params = new URLSearchParams(searchParams.toString());
    params.delete('project');
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    
    // Clean up all state after animation completes - do it all at once
    // Note: we keep originFrame as it will be overwritten on next open
      setTimeout(() => {
        console.log('[CLOSE] Animation complete, cleaning up all state at once');
        setPanelFrame(null);
        setIsExpanded(false);
        setIsClosing(false);
        setClosingProjectId(null);
      }, ANIMATION_DURATION);
  }, [pathname, router, searchParams, originFrame, selectedProject]);

  // Animate to expanded state
  useEffect(() => {
    if (!selectedProject || !originFrame) {
      return;
    }

    const raf = requestAnimationFrame(() => {
      setBackdropVisible(true);
      const finalFrame = computeFinalFrame();
      setPanelFrame(finalFrame);
      setIsExpanded(true);
    });

    const contentTimeout = setTimeout(() => {
      setContentVisible(true);
    }, 100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(contentTimeout);
    };
  }, [selectedProject, originFrame]);

  // Handle resize when expanded
  useEffect(() => {
    if (!isExpanded || isClosing) {
      return;
    }

    const handleResize = () => {
      const finalFrame = computeFinalFrame();
      setPanelFrame(finalFrame);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, isClosing]);

  // Lock body scroll when expanded
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProject]);

  // Handle escape key
  useEffect(() => {
    if (!selectedProject) {
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
  }, [selectedProject, handleCloseProject]);

  const renderProjectCard = (project: Project, isInGrid: boolean) => {
    const stops = project.gradientStops ?? [];
    const gradientStyle =
      stops.length >= 2
        ? { background: `linear-gradient(135deg, ${stops.join(', ')})` }
        : undefined;

    const isSelected = selectedProject?.id === project.id;
    const isBeingClosed = closingProjectId === project.id;
    // Only hide the grid card if we're actually rendering an overlay for it
    const isRenderingOverlay = (isSelected && isExpanded) || (isBeingClosed && isClosing);
    const shouldHide = isInGrid && isRenderingOverlay;

    if (!isInGrid) {
      console.log('[RENDER OVERLAY]', {
        projectId: project.id,
        isSelected,
        isBeingClosed,
        isClosing,
        panelFrame,
      });
    }

    if (!isInGrid && !isSelected && !isBeingClosed) {
      console.log('[RENDER] Skipping overlay render for project', project.id);
      return null;
    }
    
    if (isInGrid && shouldHide) {
      console.log('[RENDER GRID] Hiding card in grid for project', project.id);
    }

    return (
      <button
        key={project.id}
        type="button"
        onClick={() => isInGrid ? handleOpenProject(project.id) : handleCloseProject()}
        aria-label={`View details for ${project.title}`}
        ref={isInGrid ? (node) => { cardRefs.current[project.id] = node; } : undefined}
        disabled={isInGrid && (isSelected || isBeingClosed)}
        className={`group relative block w-full cursor-pointer break-inside-avoid overflow-hidden bg-slate-950/5 focus-visible:outline-none ${
          isInGrid
            ? `${project.height} rounded-3xl mb-6 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.01] hover:shadow-[0_28px_48px_-26px_rgba(15,23,42,0.38)] focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 ${
                shouldHide ? 'invisible pointer-events-none' : ''
              }`
            : ''
        }`}
        style={
          !isInGrid
            ? {
                position: 'fixed' as const,
                top: panelFrame?.top ?? 0,
                left: panelFrame?.left ?? 0,
                width: panelFrame?.width ?? 0,
                height: panelFrame?.height ?? 0,
                borderRadius: panelFrame?.borderRadius ?? OVERLAY_BORDER_RADIUS,
                zIndex: 51,
                transition: [
                  `top ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
                  `left ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
                  `width ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
                  `height ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
                  `border-radius ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
                ].join(', '),
              }
            : undefined
        }
      >
        <div
          className={`absolute inset-0 opacity-90 pointer-events-none ${
            gradientStyle ? '' : `bg-gradient-to-br ${project.gradient}`
          } ${isInGrid ? 'transition-transform duration-700 group-hover:scale-110' : ''}`}
          style={gradientStyle}
        />
        <div className="relative h-full p-10 flex flex-col justify-end text-left text-white">
          <div className="flex gap-2 mb-6 flex-wrap">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm uppercase tracking-[0.18em]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className={`font-semibold text-white mb-4 ${isInGrid ? 'text-4xl' : 'text-4xl md:text-5xl'}`}>
            {project.title}
          </h3>

          {isInGrid && (
            <>
              <p className="text-lg text-white/80 leading-relaxed mb-10">{project.description}</p>

              <div className="group/view inline-flex items-center gap-2 text-white font-semibold transition-transform duration-500">
                <span className="transition-transform duration-500">View details</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover/view:translate-x-1" />
              </div>
            </>
          )}

          {!isInGrid && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseProject();
              }}
              className="absolute top-6 right-6 rounded-full border border-white/40 bg-white/60 p-2 text-slate-800 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/40"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {!isInGrid && (
          <div
            className="absolute left-0 right-0 bottom-0 overflow-hidden rounded-t-3xl bg-white text-slate-900 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] transition-transform duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: contentVisible ? 'translateY(0)' : 'translateY(100%)',
              height: '60%',
            }}
          >
            <div className="h-full overflow-y-auto px-8 py-8 md:px-12 md:py-12">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                  {project.description}
                </p>

                <div className="text-sm text-slate-500">
                  Interested in learning more about{' '}
                  <strong className="font-semibold text-slate-700">{project.title}</strong>? Drop me
                  a line using the contact section below.
                </div>
              </div>
            </div>
          </div>
        )}
      </button>
    );
  };

  console.log('[COMPONENT RENDER]', {
    selectedProjectId: selectedProject?.id,
    isClosing,
    closingProjectId,
    isExpanded,
    hasPanelFrame: !!panelFrame,
    hasOriginFrame: !!originFrame,
  });

  return (
    <section id="projects" className="min-h-screen py-32 px-6 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold mb-32 text-black">Projects</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project) => renderProjectCard(project, true))}
        </div>
      </div>

      {/* Backdrop */}
      {(selectedProject || isClosing) && (
        <div
          className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-lg transition-opacity duration-300 ${
            backdropVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleCloseProject}
        />
      )}

      {/* Morphing card overlay */}
      {(() => {
        console.log('[MAIN RENDER]', {
          hasSelectedProject: !!selectedProject,
          selectedProjectId: selectedProject?.id,
          isClosing,
          closingProjectId,
        });
        
        if (selectedProject) {
          console.log('[MAIN RENDER] Rendering selected project overlay');
          return renderProjectCard(selectedProject, false);
        }
        
        if (!selectedProject && isClosing && closingProjectId) {
          console.log('[MAIN RENDER] Rendering closing project overlay');
          const closingProject = projects.find(p => p.id === closingProjectId);
          return closingProject ? renderProjectCard(closingProject, false) : null;
        }
        
        console.log('[MAIN RENDER] No overlay to render');
        return null;
      })()}
    </section>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedProjectId = searchParams.get('project');

  const selectedProject = useMemo(
    () => projects.find((project) => String(project.id) === selectedProjectId),
    [projects, selectedProjectId]
  );

  const handleOpenProject = useCallback(
    (projectId: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('project', String(projectId));
      const query = params.toString();
      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleCloseProject = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('project');
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleCloseProject]);

  return (
    <section id="projects" className="min-h-screen py-32 px-6 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-bold mb-32 text-black">Projects</h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project) => {
            const stops = project.gradientStops ?? [];
            const gradientStyle =
              stops.length >= 2
                ? { background: `linear-gradient(135deg, ${stops.join(', ')})` }
                : undefined;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleOpenProject(project.id)}
                aria-label={`View details for ${project.title}`}
                className={`group relative block w-full ${project.height} cursor-pointer rounded-3xl overflow-hidden break-inside-avoid mb-6 bg-slate-950/5 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.01] hover:shadow-[0_28px_48px_-26px_rgba(15,23,42,0.38)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70`}
              >
                <div
                  className={`absolute inset-0 opacity-90 transition-transform duration-700 group-hover:scale-110 pointer-events-none ${
                    gradientStyle ? '' : `bg-gradient-to-br ${project.gradient}`
                  }`}
                  style={gradientStyle}
                />
                <div className="relative h-full p-10 flex flex-col justify-end text-left text-white">
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-4xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>

                  <p className="text-lg text-white/80 leading-relaxed mb-10">{project.description}</p>

                  <div className="group/view inline-flex items-center gap-2 text-white font-semibold transition-transform duration-500">
                    <span className="transition-transform duration-500">
                      View details
                    </span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover/view:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailPopover project={selectedProject} onClose={handleCloseProject} />
      )}
    </section>
  );
}

type ProjectDetailPopoverProps = {
  project: Project;
  onClose: () => void;
};

function ProjectDetailPopover({ project, onClose }: ProjectDetailPopoverProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsMounted(true));
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const gradientStops = project.gradientStops ?? [];
  const gradientStyle =
    gradientStops.length >= 2
      ? { background: `linear-gradient(135deg, ${gradientStops.join(', ')})` }
      : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-12">
      <div
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-lg transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-4xl transition-all duration-500 ease-out ${isMounted ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-95 opacity-0'}`}
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-3xl">
          <div
            className={`absolute inset-0 opacity-70 ${gradientStyle ? '' : `bg-gradient-to-br ${project.gradient}`}`}
            style={gradientStyle}
          />
          <div className="absolute inset-0 bg-white/60 mix-blend-screen" />
          <div className="absolute inset-0 bg-slate-900/10" />

          <div className="relative p-10 md:p-14 text-slate-900">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h3>
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="self-start rounded-full border border-white/40 bg-white/60 p-2 text-slate-800 transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/40"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.35em] text-slate-600 mb-4">Highlights</h4>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm font-medium text-slate-800 px-4 py-2 rounded-full bg-white/75 border border-white/60 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-slate-600/80 leading-relaxed">
                Interested in learning more about <strong className="font-semibold">{project.title}</strong>? Drop me a line using the contact section below.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

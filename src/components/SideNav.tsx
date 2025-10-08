'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';

type Section = {
  id: string;
  label: string;
};

type SideNavProps = {
  sections: Section[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

const SPRING_TIMING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const ACTIVE_HEIGHT = 18;
const ACTIVE_MIN_WIDTH = 20;
const INACTIVE_LINE_LENGTH = 16;
const INACTIVE_LINE_THICKNESS = 3;
const MAX_DRAG_STRETCH = 0.6;

export function SideNav({ sections, activeSection, onNavigate }: SideNavProps) {
  const [localActive, setLocalActive] = useState(activeSection);
  const [showMobileLabel, setShowMobileLabel] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStretch, setDragStretch] = useState(0);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isDesktopHovering, setIsDesktopHovering] = useState(false);

  const sectionsRef = useRef(sections);
  const activeSectionRef = useRef(activeSection);
  const onNavigateRef = useRef(onNavigate);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const labelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const draggedRef = useRef(false);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
    setLocalActive(activeSection);
  }, [activeSection]);

  const clearLabelTimeout = useCallback(() => {
    if (labelTimeoutRef.current) {
      clearTimeout(labelTimeoutRef.current);
      labelTimeoutRef.current = null;
    }
  }, []);

  const hideMobileLabel = useCallback(() => {
    clearLabelTimeout();
    setShowMobileLabel(false);
  }, [clearLabelTimeout]);

  const showMobileLabelTemporarily = useCallback(() => {
    clearLabelTimeout();
    setShowMobileLabel(true);
    labelTimeoutRef.current = setTimeout(() => {
      setShowMobileLabel(false);
      labelTimeoutRef.current = null;
    }, 1600);
  }, [clearLabelTimeout]);

  const handleWindowPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId) {
        return;
      }

      event.preventDefault();

      const buttons = buttonRefs.current;
      if (!buttons.length) {
        return;
      }

      let closestIndex = -1;
      let smallestDistance = Number.POSITIVE_INFINITY;

      buttons.forEach((button, index) => {
        if (!button) {
          return;
        }
        const rect = button.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const distance = Math.abs(event.clientY - centerY);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex === -1) {
        return;
      }

      const nextSection = sectionsRef.current[closestIndex];
      if (!nextSection) {
        return;
      }

      if (Math.abs(event.clientY - dragStartYRef.current) > 6) {
        draggedRef.current = true;
      }

      if (nextSection.id !== activeSectionRef.current) {
        activeSectionRef.current = nextSection.id;
        setLocalActive(nextSection.id);
        setShowMobileLabel(true);
        onNavigateRef.current(nextSection.id);
      }

      const activeButton = buttons[closestIndex];
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const activeCenterY = rect.top + rect.height / 2;
        const offset = event.clientY - activeCenterY;
        const stretch = Math.min(Math.abs(offset) / 140, MAX_DRAG_STRETCH);
        setDragStretch(stretch);
        if (Math.abs(offset) < 4) {
          setDragDirection(null);
        } else {
          setDragDirection(offset < 0 ? 'up' : 'down');
        }
      } else {
        setDragStretch(0);
        setDragDirection(null);
      }
    },
    [],
  );

  const handleWindowPointerUp = useCallback(
    (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) {
        return;
      }

      pointerIdRef.current = null;
      isDraggingRef.current = false;
      setIsDragging(false);
      setIsPointerActive(false);
      setDragStretch(0);
      setDragDirection(null);
      const didDrag = draggedRef.current;
      draggedRef.current = false;

      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);

      if (didDrag) {
        clearLabelTimeout();
        labelTimeoutRef.current = setTimeout(() => {
          setShowMobileLabel(false);
          labelTimeoutRef.current = null;
        }, 200);
      }
    },
    [clearLabelTimeout, handleWindowPointerMove],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
      clearLabelTimeout();
    };
  }, [clearLabelTimeout, handleWindowPointerMove, handleWindowPointerUp]);

  const handleMobilePointerDown = useCallback(
    (sectionId: string) => (event: ReactPointerEvent<HTMLButtonElement>) => {
      setIsPointerActive(true);
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }
      clearLabelTimeout();

      if (sectionId !== activeSectionRef.current) {
        setShowMobileLabel(false);
        return;
      }

      pointerIdRef.current = event.pointerId;
      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartYRef.current = event.clientY;
      draggedRef.current = false;
      setDragStretch(0);
      setDragDirection(null);
      setShowMobileLabel(true);

      window.addEventListener('pointermove', handleWindowPointerMove, { passive: false });
      window.addEventListener('pointerup', handleWindowPointerUp);
      window.addEventListener('pointercancel', handleWindowPointerUp);
    },
    [clearLabelTimeout, handleWindowPointerMove, handleWindowPointerUp],
  );

  const handleMobileClick = useCallback(
    (sectionId: string) => () => {
      setIsPointerActive(false);
      if (sectionId !== activeSectionRef.current) {
        activeSectionRef.current = sectionId;
        setLocalActive(sectionId);
        hideMobileLabel();
        onNavigateRef.current(sectionId);
        return;
      }

      if (draggedRef.current) {
        draggedRef.current = false;
        return;
      }

      showMobileLabelTemporarily();
    },
    [hideMobileLabel, showMobileLabelTemporarily],
  );

  const handleMobilePointerEnd = useCallback(() => {
    setIsPointerActive(false);
  }, []);

  const navElevated = isPointerActive || showMobileLabel || isDragging || isDesktopHovering;
  const activeNodeColor = navElevated ? 'rgba(22, 22, 22, 0.95)' : 'rgba(22, 22, 22, 0.72)';
  const inactiveLineColor = navElevated ? 'rgba(215, 215, 215, 0.84)' : 'rgba(200, 200, 200, 0.46)';
  const labelStyleBase: CSSProperties = {
    backgroundColor: 'rgba(15, 15, 15, 0.9)',
  };
  const railStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 4,
    touchAction: isDragging ? 'none' : 'auto',
    opacity: navElevated ? 1 : 0.55,
    transition: `opacity 200ms ${SPRING_TIMING}`,
  };

  return (
    <>
      <nav className="pointer-events-none fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 md:inline-flex">
        <div
          className="pointer-events-auto flex flex-col items-start gap-0.5"
          style={railStyle}
          onMouseEnter={() => setIsDesktopHovering(true)}
          onMouseLeave={() => setIsDesktopHovering(false)}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const showLabel = isActive && showMobileLabel;
            const labelClasses = [
              'pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 rounded-full bg-black/85 px-4 py-1 text-sm font-semibold text-white shadow-lg transition-all duration-200',
              showLabel ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
              'group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0',
            ].join(' ');

            return (
              <button
                key={section.id}
                type="button"
                className="group relative flex h-9 w-14 items-center justify-start"
                aria-label={section.label}
                aria-current={isActive ? 'true' : undefined}
                onClick={handleMobileClick(section.id)}
              >
                {isActive ? (
                  <span
                    className="block"
                    style={{
                      minWidth: ACTIVE_MIN_WIDTH + 6,
                      height: ACTIVE_HEIGHT + 4,
                      borderTopRightRadius: ACTIVE_HEIGHT + 8,
                      borderBottomRightRadius: ACTIVE_HEIGHT + 8,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: activeNodeColor,
                      boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
                    }}
                  />
                ) : (
                  <span
                    className="block"
                    style={{
                      width: INACTIVE_LINE_LENGTH + 6,
                      height: INACTIVE_LINE_THICKNESS + 1,
                      borderRadius: INACTIVE_LINE_THICKNESS,
                      backgroundColor: inactiveLineColor,
                    }}
                  />
                )}
                <span className={labelClasses}>{section.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <nav className="pointer-events-none fixed left-0 top-1/2 z-50 -translate-y-1/2 inline-flex md:hidden">
        <div className="pointer-events-auto flex flex-col items-start gap-0.5" style={railStyle}>
          {sections.map((section, index) => {
            const isActive = localActive === section.id;
            const stretchAmount = isActive && isDragging ? dragStretch : 0;
            const transformOrigin =
              dragDirection === 'up'
                ? 'left bottom'
                : dragDirection === 'down'
                  ? 'left top'
                  : 'left center';
            const showLabel = isActive && (showMobileLabel || isPointerActive);

            return (
              <button
                key={section.id}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                type="button"
                className="group relative flex h-8 w-9 items-center justify-start"
                aria-label={section.label}
                aria-current={isActive ? 'true' : undefined}
                onPointerDown={handleMobilePointerDown(section.id)}
                onPointerUp={handleMobilePointerEnd}
                onPointerCancel={handleMobilePointerEnd}
                onClick={handleMobileClick(section.id)}
              >
                {isActive ? (
                  <span
                    className="block"
                    style={{
                      minWidth: ACTIVE_MIN_WIDTH,
                      height: ACTIVE_HEIGHT,
                      borderTopRightRadius: ACTIVE_HEIGHT,
                      borderBottomRightRadius: ACTIVE_HEIGHT,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: activeNodeColor,
                      transform:
                        stretchAmount > 0
                          ? `scale(${1 + stretchAmount * 0.45}, ${1 + stretchAmount})`
                          : 'scale(1, 1)',
                      transformOrigin,
                      transition: isDragging
                        ? `transform 90ms linear, box-shadow 220ms ${SPRING_TIMING}, background-color 220ms ${SPRING_TIMING}`
                        : `all 280ms ${SPRING_TIMING}`,
                      boxShadow:
                        showLabel || isDragging
                          ? '0 14px 36px rgba(0,0,0,0.28)'
                          : '0 6px 18px rgba(0,0,0,0.16)',
                    }}
                  />
                ) : (
                  <span
                    className="block transition-transform"
                    style={{
                      width: INACTIVE_LINE_LENGTH,
                      height: INACTIVE_LINE_THICKNESS,
                      borderRadius: INACTIVE_LINE_THICKNESS,
                      backgroundColor: inactiveLineColor,
                      transitionDuration: '260ms',
                      transitionTimingFunction: SPRING_TIMING,
                      transform: 'scale(1)',
                    }}
                  />
                )}
                {showLabel ? (
                  <span
                    className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-full bg-black/90 px-3 py-1 text-xs font-medium text-white shadow-lg"
                    style={{
                      transition: `opacity 200ms ${SPRING_TIMING}, transform 260ms ${SPRING_TIMING}`,
                      opacity: 1,
                      ...labelStyleBase,
                    }}
                  >
                    {section.label}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

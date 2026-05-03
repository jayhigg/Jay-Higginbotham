import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { DraggableCanvas } from '../components/DraggableCanvas';
import { ProjectItem } from '../components/ProjectItem';
import { LayoutToggle } from '../components/LayoutToggle';
import { HoverCard } from '../components/HoverCard';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { SwapButton } from '../components/SwapButton';
import { PROJECTS } from '../constants';
import { Project } from '../types';

export const IndexView: React.FC = () => {
  const [layout, setLayout] = useState<'canvas' | 'grid'>('canvas');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const resetCanvasRef = useRef<(() => void) | null>(null);
  const [showInstruction, setShowInstruction] = useState(true);

  // Visibility tracking
  useEffect(() => {
    if (layout === 'grid') {
      setVisibleCount(PROJECTS.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).length;
        setVisibleCount(visible);
        if (visible > 0) setShowInstruction(false);
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.project-item-trigger');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [layout]);

  const handleProjectClick = React.useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleNextProject = () => {
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject?.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <DraggableCanvas 
        disabled={layout === 'grid'} 
        onReset={(fn) => { resetCanvasRef.current = fn; }}
      >
        <div className={layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24 max-w-7xl mx-auto pt-40 px-8' : ''}>
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="project-item-trigger">
              <ProjectItem
                project={project}
                layout={layout}
                index={i}
                onHover={setHoveredProject}
                onClick={handleProjectClick}
              />
            </div>
          ))}
        </div>
      </DraggableCanvas>

      {/* Global UI Overlays */}
      <div className="fixed top-8 right-8 z-50 flex flex-col items-end gap-6 pointer-events-none">
        <div className="pointer-events-auto">
          <LayoutToggle 
            layout={layout} 
            onToggle={setLayout} 
            count={visibleCount} 
            total={PROJECTS.length} 
          />
        </div>
      </div>

      <AnimatePresence>
        {layout === 'canvas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 pointer-events-none"
          >
            {showInstruction && (
              <div className="bg-[--ink] text-[--paper-light] px-4 py-2 rounded-full text-xs font-body uppercase tracking-widest pointer-events-auto">
                Drag to explore
              </div>
            )}
            <div className="pointer-events-auto">
              <SwapButton
                variant="ghost"
                label="Reset Position"
                onClick={() => resetCanvasRef.current?.()}
                className="text-xs transition-opacity opacity-60 hover:opacity-100"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HoverCard project={hoveredProject} isVisible={!!hoveredProject && !selectedProject} />
      
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
      />
    </div>
  );
};

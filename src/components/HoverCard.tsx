import { motion, useSpring, useMotionValue } from 'motion/react';
import React, { useEffect } from 'react';
import { Project } from '../types';

interface HoverCardProps {
  project: Project | null;
  isVisible: boolean;
}

export const HoverCard: React.FC<HoverCardProps> = ({ project, isVisible }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 24);
      mouseY.set(e.clientY - 12);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!project) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: sx,
        top: sy,
        pointerEvents: 'none',
        zIndex: 60,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 8 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="soft-card p-4 w-[260px]"
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.15em] font-body text-[--ink-soft]">
          {project.category}
        </span>
        <h3 className="font-heading italic text-2xl text-[--ink] leading-none mt-1">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 mt-3 text-xs font-body text-[--ink-soft]">
          <span>{project.client}</span>
          <span className="w-1 h-1 rounded-full bg-[--hairline]" />
          <span>{project.year}</span>
        </div>
        <div className="mt-4 text-[10px] font-body uppercase tracking-wider text-[--ink]/60 flex items-center gap-1">
          open case study <span className="text-xl leading-none">→</span>
        </div>
      </div>
    </motion.div>
  );
};

import { motion } from 'motion/react';
import React from 'react';
import { Project } from '../types';

interface ProjectItemProps {
  project: Project;
  layout: 'canvas' | 'grid';
  onHover: (project: Project | null) => void;
  onClick: (project: Project) => void;
  index: number;
}

export const ProjectItem = React.memo<ProjectItemProps>(({
  project,
  layout,
  onHover,
  onClick,
  index,
}) => {
  const isCanvas = layout === 'canvas';

  const canvasStyle = {
    left: `calc(50% + ${project.x}px)`,
    top: `calc(50% + ${project.y}px)`,
    rotate: project.rotate,
    scale: project.scale,
    x: '-50%',
    y: '-50%',
  };

  const gridStyle = {
    rotate: 0,
    scale: 1,
    x: 0,
    y: 0,
    left: 'auto',
    top: 'auto',
    position: 'relative' as const,
  };

  return (
    <motion.div
      layout
      layoutDependency={layout}
      layoutId={`project-${project.id}`}
      style={isCanvas ? { position: 'absolute', ...canvasStyle } : gridStyle}
      transition={{
        delay: index * 0.02,
        type: 'spring',
        stiffness: 200,
        damping: 25,
      }}
      className={`group cursor-pointer z-10 hover:z-50`}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(project)}
    >
      <motion.div
        whileHover={{
          scale: 1.06,
          rotate: 0,
          y: -4,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        className="relative"
        onDragStart={(e) => e.preventDefault()}
      >
        <img
          src={project.img}
          alt={project.title}
          draggable={false}
          style={{ width: isCanvas ? (project.width || 280) : '100%' }}
          className={`
            pointer-events-none select-none transition-all duration-300
            drop-shadow-[0_12px_24px_rgba(26,26,26,0.15)]
            ${isCanvas ? '' : 'object-contain'}
          `}
        />
        {layout === 'grid' && (
          <div className="mt-4">
            <h4 className="font-heading italic text-xl text-[--ink]">{project.title}</h4>
            <p className="font-body text-xs text-[--ink-soft] uppercase tracking-wider mt-1">{project.category}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

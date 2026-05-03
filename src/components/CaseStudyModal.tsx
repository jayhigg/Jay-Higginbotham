import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onNext,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[--ink]/30 backdrop-blur-md z-[100] cursor-pointer"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="fixed inset-x-0 top-12 bottom-0 mx-auto max-w-5xl bg-[--paper] rounded-t-[32px] overflow-y-auto no-scrollbar z-[101] shadow-2xl"
          >
            {/* Header / Nav */}
            <div className="sticky top-0 z-50 p-8 flex justify-between items-start pointer-events-none">
              <div />
              <button
                onClick={onClose}
                className="soft-card-flat p-3 pointer-events-auto bg-[--paper-light] hover:bg-[--paper-dark] transition-colors"
              >
                <X className="w-5 h-5 text-[--ink]" />
              </button>
            </div>

            <div className="px-8 md:px-16 pb-24 -mt-16">
              {/* Eyebrow */}
              <div className="flex gap-4 text-xs font-body uppercase tracking-[0.2em] text-[--ink-soft] mb-8">
                <span>{project.category}</span>
                <span>/</span>
                <span>{project.year}</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.02em] text-[--ink] mb-12">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? 'italic' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              {/* Intro Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 border-t border-[--hairline] pt-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[--ink-soft] mb-4">The Brief</h3>
                  <p className="font-body text-xl text-[--ink] leading-relaxed">
                    {project.brief || "Exploring the intersection of form and utility through a reimagined identity system that prioritizes clarity and tactile material choice."}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[--ink-soft] mb-4">The Role</h3>
                  <p className="font-body text-sm text-[--ink-soft] leading-relaxed">
                    Creative Direction, Brand Identity, Packaging Strategy, Art Direction.
                    <br /><br />
                    {project.role || "Lead Designer / Independent Consultant"}
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full aspect-video rounded-[32px] overflow-hidden mb-24 bg-[--paper-dark]">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Sections */}
              <div className="space-y-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="soft-card aspect-square bg-[--paper-light] flex items-center justify-center p-12">
                     <img src={project.img} alt="Detail" className="w-full h-full object-contain filter drop-shadow-xl" />
                  </div>
                  <div className="max-w-md">
                    <h4 className="font-heading italic text-3xl mb-4">Tactile Resilience</h4>
                    <p className="font-body text-[--ink-soft] leading-relaxed">
                      Every touchpoint was analyzed for its physical weight and surface texture. We opted for uncoated papers and debossed metallic foils to reflect the brand's commitment to craftsmanship.
                    </p>
                  </div>
                </div>

                 <div className="soft-card p-12 md:p-24 bg-[--paper-dark]">
                   <div className="max-w-3xl mx-auto text-center">
                     <h4 className="font-heading text-4xl md:text-6xl mb-8 leading-snug">
                       "Design is not just what it looks like; it's how it <span className="italic">feels</span> in the hand of the user."
                     </h4>
                   </div>
                 </div>
              </div>

              {/* Footer / Next */}
              <div className="mt-32 pt-16 border-t border-[--hairline] flex justify-between items-center">
                <button 
                  onClick={onClose}
                  className="font-body text-sm text-[--ink-soft] hover:text-[--ink] transition-colors"
                >
                  ← Back to Index
                </button>
                <button
                  onClick={onNext}
                  className="font-heading italic text-3xl text-[--ink] hover:translate-x-2 transition-transform"
                >
                  Next Project →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

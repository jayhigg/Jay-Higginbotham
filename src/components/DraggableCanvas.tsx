import { motion, useMotionValue, animate } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';

interface DraggableCanvasProps {
  children: React.ReactNode;
  disabled?: boolean;
  onReset?: (fn: () => void) => void;
}

export const DraggableCanvas: React.FC<DraggableCanvasProps> = ({
  children,
  disabled = false,
  onReset,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: -1000, right: 1000, top: -800, bottom: 800 });
  const dragEndedTime = useRef(0);

  // Update bounds dynamically based on window size

  useEffect(() => {
    const updateConstraints = () => {
      // The elements go approximately from x: -1650 to 1380 and y: -870 to 1020
      // We want to stop panning so elements don't completely leave the screen
      // If window is width W, then max pan is to put the max element near the edge
      const paddingX = window.innerWidth / 2 - 150; // Keep at least 150px of the outmost element in view
      const paddingY = window.innerHeight / 2 - 150;
      
      setConstraints({
        left: Math.min(0, -(1380 - paddingX)),    // Drag limit to the left (viewing far right items)
        right: Math.max(0, 1650 - paddingX),   // Drag limit to the right (viewing far left items)
        top: Math.min(0, -(1020 - paddingY)),     // Drag limit going up (viewing bottom items)
        bottom: Math.max(0, 870 - paddingY),   // Drag limit going down (viewing top items)
      });
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // expose reset
  useEffect(() => {
    if (!onReset) return;
    onReset(() => {
      animate(x, 0, { duration: 0.6, ease: [0.32, 0.72, 0, 1] });
      animate(y, 0, { duration: 0.6, ease: [0.32, 0.72, 0, 1] });
    });
  }, [onReset, x, y]);

  // when entering grid mode, snap motion values back to 0 so re-entering canvas doesn't jump
  useEffect(() => {
    if (disabled) {
      x.set(0);
      y.set(0);
    }
  }, [disabled, x, y]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden ${
        disabled ? 'overflow-y-auto' : isDragging ? 'canvas-cursor-active' : 'canvas-cursor'
      }`}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        drag={!disabled}
        dragConstraints={constraints}
        dragElastic={0.05}
        dragTransition={{ power: 0.2, timeConstant: 200, bounceStiffness: 300, bounceDamping: 20 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          dragEndedTime.current = performance.now();
        }}
        onClickCapture={(e) => {
          if (isDragging || performance.now() - dragEndedTime.current < 200) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        style={{ 
          x: disabled ? 0 : x, 
          y: disabled ? 0 : y, 
          width: disabled ? '100%' : 'calc(100vw + 4000px)', 
          height: disabled ? '100%' : 'calc(100vh + 4000px)', 
          left: disabled ? 'auto' : '-2000px',
          top: disabled ? 'auto' : '-2000px',
          position: disabled ? 'relative' : 'absolute' 
        }}
        className={disabled ? 'p-12 pb-32 h-auto' : ''}
      >
        {children}
      </motion.div>
    </div>
  );
};


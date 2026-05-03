import { motion, useMotionValue, useSpring, animate } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft springs for smoother feel if needed, but manual drag is usually 1:1
  const springConfig = { stiffness: 400, damping: 40 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastUpdate = useRef({ time: Date.now(), x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (onReset) {
      onReset(() => {
        animate(x, 0, { duration: 0.6, ease: 'easeInOut' });
        animate(y, 0, { duration: 0.6, ease: 'easeInOut' });
      });
    }
  }, [onReset, x, y]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX - x.get(), y: e.clientY - y.get() };
    lastUpdate.current = { time: Date.now(), x: x.get(), y: y.get() };
    
    // Stop any ongoing inertia
    x.stop();
    y.stop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled) return;
    
    const now = Date.now();
    const dt = now - lastUpdate.current.time;
    
    const nextX = e.clientX - startPos.current.x;
    const nextY = e.clientY - startPos.current.y;
    
    // Clamp to generous box
    const clampedX = Math.max(-2000, Math.min(500, nextX));
    const clampedY = Math.max(-1500, Math.min(500, nextY));

    if (dt > 0) {
      velocity.current = {
        x: (clampedX - lastUpdate.current.x) / dt,
        y: (clampedY - lastUpdate.current.y) / dt,
      };
    }

    x.set(clampedX);
    y.set(clampedY);
    
    lastUpdate.current = { time: now, x: clampedX, y: clampedY };
  };

  const handlePointerUp = () => {
    if (!isDragging || disabled) return;
    setIsDragging(false);

    // Apply momentum with inertia
    const inertiaPower = 0.6;
    const vX = velocity.current.x * 200;
    const vY = velocity.current.y * 200;

    animate(x, x.get() + vX * inertiaPower, {
      type: 'inertia',
      power: inertiaPower,
      bounceStiffness: 200,
      bounceDamping: 20,
      min: -2000,
      max: 500,
    });

    animate(y, y.get() + vY * inertiaPower, {
      type: 'inertia',
      power: inertiaPower,
      bounceStiffness: 200,
      bounceDamping: 20,
      min: -1500,
      max: 500,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${disabled ? 'overflow-y-auto' : 'cursor-grab active:cursor-grabbing'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        style={{
          x: disabled ? 0 : sx,
          y: disabled ? 0 : sy,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        className={disabled ? 'p-12 pb-32 h-auto' : ''}
      >
        {children}
      </motion.div>
    </div>
  );
};

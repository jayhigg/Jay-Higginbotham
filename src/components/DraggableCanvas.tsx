import { motion, useMotionValue, animate } from 'motion/react';
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface DraggableCanvasProps {
  children: React.ReactNode;
  disabled?: boolean;
  onReset?: (fn: () => void) => void;
  onDragStart?: () => void; // optional: parent can hide hover cards while dragging
}

const DRAG_THRESHOLD = 5; // px before a pointerdown becomes a drag

export const DraggableCanvas: React.FC<DraggableCanvasProps> = ({
  children,
  disabled = false,
  onReset,
  onDragStart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const pointerDown = useRef(false);
  const dragStarted = useRef(false);
  const startClient = useRef({ x: 0, y: 0 });
  const startMotion = useRef({ x: 0, y: 0 });
  const lastSample = useRef({ time: 0, x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

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

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    pointerDown.current = true;
    dragStarted.current = false;
    startClient.current = { x: e.clientX, y: e.clientY };
    startMotion.current = { x: x.get(), y: y.get() };
    lastSample.current = { time: performance.now(), x: x.get(), y: y.get() };
    velocity.current = { x: 0, y: 0 };
    x.stop();
    y.stop();
  }, [disabled, x, y]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current || disabled) return;
    const dx = e.clientX - startClient.current.x;
    const dy = e.clientY - startClient.current.y;

    // commit to drag only after threshold
    if (!dragStarted.current) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      dragStarted.current = true;
      setIsDragging(true);
      onDragStart?.();
      // capture pointer so drag survives leaving the window
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const nextX = startMotion.current.x + dx;
    const nextY = startMotion.current.y + dy;

    // sample velocity in px/sec for inertia
    const now = performance.now();
    const dt = now - lastSample.current.time;
    if (dt > 0) {
      velocity.current = {
        x: ((nextX - lastSample.current.x) / dt) * 1000,
        y: ((nextY - lastSample.current.y) / dt) * 1000,
      };
      lastSample.current = { time: now, x: nextX, y: nextY };
    }

    x.set(nextX);
    y.set(nextY);
  }, [disabled, x, y, onDragStart]);

  const endPointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current) return;
    pointerDown.current = false;

    if (dragStarted.current) {
      // release drag with proper inertia (velocity-driven, not target-driven)
      animate(x, x.get(), {
        type: 'inertia',
        velocity: velocity.current.x,
        power: 0.7,
        timeConstant: 400,
        min: -3000,
        max: 3000,
        bounceStiffness: 200,
        bounceDamping: 30,
      });
      animate(y, y.get(), {
        type: 'inertia',
        velocity: velocity.current.y,
        power: 0.7,
        timeConstant: 400,
        min: -2500,
        max: 2500,
        bounceStiffness: 200,
        bounceDamping: 30,
      });
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    }
    setIsDragging(false);
    dragStarted.current = false;
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${
        disabled ? 'overflow-y-auto' : isDragging ? 'canvas-cursor-active' : 'canvas-cursor'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        // CRITICAL: render directly off raw motion values, no spring in between
        style={{ x: disabled ? 0 : x, y: disabled ? 0 : y, width: '100%', height: '100%', position: 'relative' }}
        className={disabled ? 'p-12 pb-32 h-auto' : ''}
      >
        {children}
      </motion.div>
    </div>
  );
};

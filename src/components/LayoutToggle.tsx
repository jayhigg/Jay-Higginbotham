import { motion } from 'motion/react';
import { LayoutGrid, MousePointer2 } from 'lucide-react';
import React from 'react';

interface LayoutToggleProps {
  layout: 'canvas' | 'grid';
  onToggle: (layout: 'canvas' | 'grid') => void;
  count: number;
  total: number;
}

export const LayoutToggle: React.FC<LayoutToggleProps> = ({
  layout,
  onToggle,
  count,
  total,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="soft-card-flat px-4 py-2 text-xs font-body text-[--ink-soft] bg-[--paper-light]/80 backdrop-blur-sm">
        {count} / {total} pieces
      </div>
      <div className="soft-card-flat p-1 flex gap-1 bg-[--paper-light]/80 backdrop-blur-sm">
        <button
          onClick={() => onToggle('canvas')}
          className={`p-2 rounded-lg transition-colors ${
            layout === 'canvas' ? 'bg-[--ink] text-[--paper-light]' : 'text-[--ink]/40 hover:text-[--ink]'
          }`}
        >
          <MousePointer2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onToggle('grid')}
          className={`p-2 rounded-lg transition-colors ${
            layout === 'grid' ? 'bg-[--ink] text-[--paper-light]' : 'text-[--ink]/40 hover:text-[--ink]'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

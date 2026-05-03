import { motion } from 'motion/react';
import React from 'react';

interface SwapButtonProps {
  label: string;
  italicWord?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  label,
  italicWord,
  variant = 'primary',
  onClick,
  className = '',
  fullWidth = false,
}) => {
  const parts = label.split(' ');
  
  const processedLabel = (
    <>
      {parts.map((part, i) => (
        <span key={i} className={part === italicWord ? 'font-heading italic ml-1 mr-1' : ''}>
          {part}{i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );

  const variants = {
    primary: 'bg-[--ink] text-[--paper-light]',
    secondary: 'bg-transparent text-[--ink] border-[1.5px] border-[--ink]',
    ghost: 'text-[--ink] bg-transparent',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-full overflow-hidden font-body font-medium text-sm transition-colors duration-400
        ${fullWidth ? 'w-full' : ''}
        ${variant !== 'ghost' ? 'px-7 py-3.5' : 'px-1'}
        ${variants[variant]}
        ${className}
        group
      `}
    >
      <div className="relative h-[1lh] overflow-hidden">
        <motion.div
          className="flex flex-col transition-transform duration-[400ms]"
          style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }}
          initial={false}
          whileHover={{ y: '-100%' }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-[1lh] flex items-center justify-center whitespace-nowrap">
              {processedLabel}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.button>
  );
};

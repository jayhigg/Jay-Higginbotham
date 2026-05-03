import { motion } from 'motion/react';
import React from 'react';

interface BlurInTextProps {
  text: string;
  className?: string;
}

export const BlurInText: React.FC<BlurInTextProps> = ({ text, className = '' }) => {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: i * 0.06,
          }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

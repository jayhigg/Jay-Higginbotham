import { motion } from 'motion/react';
import React from 'react';
import { BlurInText } from '../components/BlurInText';
import { SwapButton } from '../components/SwapButton';

interface ProcessViewProps {
  onStartProject: () => void;
}

export const ProcessView: React.FC<ProcessViewProps> = ({ onStartProject }) => {
  const steps = [
    {
      id: "01",
      title: "Discovery",
      body: "We begin by stripping away assumptions. Through deep research and founder workshops, we unearth the core narrative that will drive the strategy.",
      outcomes: ["Market Audit", "Brand Archetype", "Core Narrative"]
    },
    {
      id: "02",
      title: "Strategy",
      body: "Turning insights into actionable direction. We define the brand's positioning, voice, and visual north star before a single pixel is moved.",
      outcomes: ["Visual Manifesto", "Voice & Tone", "Positioning Map"]
    },
    {
      id: "03",
      title: "Design",
      body: "High-craft execution. We build identity systems that are flexible yet disciplined, focusing on typography, material choice, and motion.",
      outcomes: ["Identity System", "Digital Foundations", "Physical Prototypes"]
    },
    {
      id: "04",
      title: "Delivery",
      body: "Seamless handoff. We provide the tools and guidelines necessary for the brand to live and grow independently across all touchpoints.",
      outcomes: ["Brand Guidelines", "Asset Library", "Production Specs"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto px-8 py-32"
    >
      <div className="text-sm font-body text-[--ink-soft] mb-6 uppercase tracking-widest">// Process / 01—04</div>
      
      <BlurInText 
        text="How the work gets made." 
        className="font-heading text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-[-0.03em] text-[--ink]"
      />
      
      <div className="mt-12 max-w-2xl font-body text-xl text-[--ink-soft] leading-relaxed">
        Building brands is a collaborative, iterative, and research-first process. I work directly with leadership to ensure every decision is rooted in strategy.
      </div>

      <div className="mt-32 space-y-12">
        {steps.map((step, i) => (
          <div key={i} className="soft-card p-10 md:p-16 flex flex-col md:flex-row gap-12 group hover:bg-[--paper-light] transition-colors">
            <div className="flex-shrink-0">
               <span className="font-heading text-9xl text-[--ink]/10 leading-none group-hover:text-[--ink]/20 transition-colors">
                 {step.id}
               </span>
            </div>
            <div className="flex-grow">
              <h3 className="font-heading italic text-5xl mb-8">{step.title}</h3>
              <p className="font-body text-lg text-[--ink-soft] leading-relaxed max-w-xl mb-12">
                {step.body}
              </p>
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-[--ink-soft]">What you get</h4>
                <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-[--hairline] pt-4">
                  {step.outcomes.map((o, idx) => (
                    <span key={idx} className="text-sm font-body font-medium">{o}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-40 flex justify-center">
        <SwapButton 
          label="Start a project →" 
          variant="primary" 
          onClick={onStartProject} 
          italicWord="project"
        />
      </div>
    </motion.div>
  );
};

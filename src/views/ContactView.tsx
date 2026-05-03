import { motion } from 'motion/react';
import React from 'react';
import { BlurInText } from '../components/BlurInText';
import { SwapButton } from '../components/SwapButton';

export const ContactView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto px-8 py-32"
    >
      <div className="text-sm font-body text-[--ink-soft] mb-6 uppercase tracking-widest">// Contact</div>
      
      <BlurInText 
        text="Let's make something worth keeping." 
        className="font-heading text-6xl md:text-8xl leading-[0.9] tracking-[-0.03em] text-[--ink]"
      />

      <div className="mt-12 space-y-8">
        <p className="font-body text-xl text-[--ink-soft] leading-relaxed max-w-xl">
          Currently booking projects for <span className="text-[--ink] font-medium">[Q2 2026]</span>. I typically reply within 48 hours to serious inquiries.
        </p>

        <a 
          href="mailto:hello@designer.studio" 
          className="inline-block font-heading italic text-4xl text-[--ink] underline underline-offset-[12px] decoration-[--hairline] hover:decoration-[--ink] transition-all"
        >
          hello@palmer.studio
        </a>
      </div>

      <div className="soft-card p-10 mt-24">
        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-[--ink-soft] block mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-[--hairline] py-3 font-body text-base outline-none focus:border-[--ink] transition-colors"
                required
              />
            </div>
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-[--ink-soft] block mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-[--hairline] py-3 font-body text-base outline-none focus:border-[--ink] transition-colors"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <label className="text-[10px] uppercase tracking-widest text-[--ink-soft] block mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">Project Type</label>
            <select className="w-full bg-transparent border-b border-[--hairline] py-3 font-body text-base outline-none focus:border-[--ink] transition-colors appearance-none cursor-pointer">
              <option>Brand Identity</option>
              <option>Packaging</option>
              <option>Art Direction</option>
              <option>Editorial Design</option>
              <option>Other</option>
            </select>
          </div>

          <div className="relative group">
            <label className="text-[10px] uppercase tracking-widest text-[--ink-soft] block mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">Project Overview</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border-b border-[--hairline] py-3 font-body text-base outline-none focus:border-[--ink] transition-colors resize-none"
              required
            />
          </div>

          <SwapButton label="Send the brief" fullWidth variant="primary" />
        </form>
      </div>

      <div className="mt-16 flex flex-wrap justify-between items-center gap-8 border-t border-[--hairline] pt-8">
        {['Email', 'LinkedIn', 'Instagram', 'Are.na'].map((link) => (
          <SwapButton key={link} label={link} variant="ghost" className="text-xs uppercase tracking-widest" />
        ))}
      </div>
    </motion.div>
  );
};

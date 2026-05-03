import { motion } from 'motion/react';
import React from 'react';
import { BlurInText } from '../components/BlurInText';
import { SwapButton } from '../components/SwapButton';

interface AboutViewProps {
  onSeeWork: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onSeeWork }) => {
  const clients = [
    "Apple", "Herman Miller", "Vitsœ", "Aesop",
    "MoMA", "Rimowa", "The New York Times", "Snow Peak",
    "Maharam", "Grown Alchemist", "Kvadrat", "Teenage Engineering"
  ];

  const capabilities = [
    { title: "Brand Identity", desc: "Core visual languages that bridge legacy and future.", tools: ["Logos", "Typefaces", "Systems"] },
    { title: "Art Direction", desc: "Crafting narratives across photography and motion.", tools: ["Casting", "Styling", "Sets"] },
    { title: "Editorial Design", desc: "The physical weight of knowledge and storytelling.", tools: ["Layout", "Grids", "Paper"] },
    { title: "Packaging", desc: "The first tactile handshake between brand and person.", tools: ["Structure", "Foil", "Die-cuts"] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto px-8 py-32"
    >
      <div className="text-sm font-body text-[--ink-soft] mb-6 uppercase tracking-widest">// About</div>
      
      <BlurInText 
        text="Brand design for the people building tomorrow." 
        className="font-heading text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-[-0.03em] text-[--ink]"
      />

      <div className="grid md:grid-cols-2 gap-12 mt-24">
        <div className="space-y-8 font-body text-xl text-[--ink-soft] leading-relaxed">
          <p>
            For the past eight years, I've partnered with founders and established brands to distill complex narratives into singular, tactile visual identities.
          </p>
          <p>
            My practice is rooted in restraint and craftsmanship. I believe that a brand is most effective when it feels inevitable—as if it has always existed, yet speaks clearly to the contemporary moment.
          </p>
          <p>
            Operating as an independent creative director allows for a high-touch, collaborative approach where the design process becomes a shared research project into what makes a product truly worth keeping.
          </p>
        </div>

        <div className="soft-card p-8 h-fit">
          <h3 className="font-heading italic text-3xl mb-8">Currently</h3>
          <div className="space-y-6">
            {[
              { label: "Role", val: "Independent Creative Director" },
              { label: "Based", val: "Brooklyn, NY" },
              { label: "Open to", val: "Brand systems, art direction" },
              { label: "Speaking", val: "AIGA NY, Nov 2025" }
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-end border-b border-[--hairline] pb-3">
                <span className="text-xs font-body text-[--ink-soft] uppercase tracking-wider">{row.label}</span>
                <span className="font-body text-sm font-medium">{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-40">
        <h3 className="text-xs font-body text-[--ink-soft] uppercase tracking-widest mb-12">Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="soft-card p-6 flex flex-col justify-between aspect-square md:aspect-auto min-h-[240px]">
              <div>
                <h4 className="font-heading italic text-2xl mb-3">{cap.title}</h4>
                <p className="text-sm font-body text-[--ink-soft] leading-relaxed mb-6">{cap.desc}</p>
              </div>
              <ul className="space-y-1">
                {cap.tools.map((t, idx) => (
                  <li key={idx} className="text-[10px] font-body text-[--ink-soft]/60 uppercase tracking-widest">• {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Clients */}
      <div className="mt-40 border-t border-[--hairline] pt-8">
        <h3 className="text-xs font-body text-[--ink-soft] uppercase tracking-widest mb-12">Selected Clients</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
          {clients.map((client, i) => (
            <div key={i} className="font-heading italic text-2xl text-[--ink]/70 hover:text-[--ink] transition-colors">
              {client}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40 flex justify-center">
        <SwapButton 
          label="See the work →" 
          variant="primary" 
          onClick={onSeeWork} 
          italicWord="work"
        />
      </div>
    </motion.div>
  );
};

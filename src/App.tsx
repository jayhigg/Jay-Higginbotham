/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { SwapButton } from './components/SwapButton';
import { IndexView } from './views/IndexView';
import { AboutView } from './views/AboutView';
import { ProcessView } from './views/ProcessView';
import { ContactView } from './views/ContactView';
import { ViewType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('index');

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'Index', view: 'index' },
    { label: 'About', view: 'about' },
    { label: 'Process', view: 'process' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleLogoClick = () => {
    if (currentView === 'index') {
      // Logic for reset handled inside IndexView by local interaction
      window.location.reload(); // Simple way to reset everything
    } else {
      setCurrentView('index');
    }
  };

  return (
    <div className="min-h-screen bg-[--paper] selection:bg-[--ink] selection:text-[--paper-light]">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-[100] px-8 lg:px-16 pt-8 pb-4 pointer-events-none">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto relative">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="font-heading italic text-2xl text-[--ink] pointer-events-auto hover:opacity-70 transition-opacity"
          >
            Arlo Palmer
          </button>

          {/* Navigation Toggle */}
          <div className="absolute left-1/2 -translate-x-1/2 soft-card-flat p-1 flex gap-1 pointer-events-auto bg-[--paper-light]/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`
                  px-5 py-2 text-sm font-body font-medium transition-all rounded-full
                  ${currentView === link.view ? 'bg-[--ink] text-[--paper-light]' : 'text-[--ink]/60 hover:text-[--ink]'}
                `}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CTA Bottom Right */}
      <div className="fixed bottom-8 right-8 z-[100] hidden lg:block pointer-events-auto">
        <SwapButton
          label="Available for work"
          variant="secondary"
          italicWord="for work"
          onClick={() => setCurrentView('contact')}
        />
      </div>

      {/* Main Content */}
      <main className={`${currentView !== 'index' ? 'overflow-y-auto no-scrollbar' : 'h-screen overflow-hidden'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          >
            {currentView === 'index' && <IndexView />}
            {currentView === 'about' && <AboutView onSeeWork={() => setCurrentView('index')} />}
            {currentView === 'process' && <ProcessView onStartProject={() => setCurrentView('contact')} />}
            {currentView === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer (Mobile/About Only) */}
      {currentView !== 'index' && (
        <footer className="px-8 lg:px-16 py-32 border-t border-[--hairline] bg-[--paper-dark]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
             <div className="max-w-md">
                <h4 className="font-heading italic text-3xl mb-4">Arlo Palmer</h4>
                <p className="text-[--ink-soft] font-body text-sm leading-relaxed">
                  Creative Director focusing on the physical and digital foundations of brand. Building artifacts that endure.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-x-16 gap-y-8">
               <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-[--ink-soft]">Social</span>
                  <ul className="space-y-2 text-sm font-medium">
                    <li><a href="#" className="hover:underline">Instagram</a></li>
                    <li><a href="#" className="hover:underline">Are.na</a></li>
                    <li><a href="#" className="hover:underline">LinkedIn</a></li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-[--ink-soft]">Contact</span>
                  <ul className="space-y-2 text-sm font-medium">
                    <li><a href="mailto:hello@palmer.studio" className="hover:underline">Email</a></li>
                    <li><span className="text-[--ink-soft] font-normal">Brooklyn, NY</span></li>
                  </ul>
               </div>
             </div>
          </div>
          <div className="mt-32 max-w-5xl mx-auto flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[--ink-soft]">
            <span>© 2026 Arlo Palmer Studio</span>
            <span>Site by AIS Build</span>
          </div>
        </footer>
      )}
    </div>
  );
}

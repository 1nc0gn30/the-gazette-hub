import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-20"
    >
      <header className="text-center mb-20 border-b-4 border-black pb-12">
        <h1 className="font-serif font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none">About Us</h1>
      </header>
      
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-classic prose-p:leading-relaxed prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-black/60 prose-blockquote:border-l-4 prose-blockquote:border-black">
        <p>
          Founded in 1892, <strong>The Daily Chronicle</strong> has been a cornerstone of independent journalism for over a century. Our mission is to provide high-quality, independent reporting that matters.
        </p>
        
        <h2>Our Legacy</h2>
        <p>
          From the early days of the printing press to the digital age, we have remained committed to the truth. Our reporters have covered world wars, scientific breakthroughs, and the evolution of culture with unwavering integrity.
        </p>

        <blockquote>
          "The press is the only weapon which can defeat the tyrant." — Julian Thorne, Founder
        </blockquote>

        <h2>The Gazette Hub</h2>
        <p>
          Today, we are more than just a newspaper. We are a hub for modern storytellers. The Gazette Hub is our latest innovation, providing a platform for independent brands to build their own legacies.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-12">
        <div>
          <h3 className="font-serif font-bold text-2xl uppercase mb-4">134 Years</h3>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">Of Independent Journalism</p>
        </div>
        <div>
          <h3 className="font-serif font-bold text-2xl uppercase mb-4">12 Pulitzer</h3>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">Prizes for Excellence</p>
        </div>
        <div>
          <h3 className="font-serif font-bold text-2xl uppercase mb-4">45 Countries</h3>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">With Active Correspondents</p>
        </div>
      </div>
    </motion.div>
  );
}

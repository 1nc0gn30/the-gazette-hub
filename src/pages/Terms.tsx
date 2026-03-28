import React from 'react';
import { motion } from 'motion/react';

export default function Terms() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-20"
    >
      <header className="text-center mb-20 border-b-4 border-black pb-12">
        <h1 className="font-serif font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none">Terms</h1>
      </header>

      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-classic prose-p:leading-relaxed">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using The Gazette Hub, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h2>2. Intellectual Property</h2>
        <p>All content published on this platform, including text, graphics, logos, and images, is the property of The Gazette Hub or its content creators and is protected by international copyright laws.</p>

        <h2>3. User Conduct</h2>
        <p>Users are expected to use the platform in a responsible and respectful manner. Any form of harassment, hate speech, or unauthorized distribution of content is strictly prohibited.</p>

        <h2>4. Privacy Policy</h2>
        <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>

        <h2>5. Limitation of Liability</h2>
        <p>The Gazette Hub shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the platform.</p>
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'motion/react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#FEFBF6]/80 border-b border-[#E8D5B5]/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-medium text-[#2C2416]" style={{ fontFamily: 'Lora, serif' }}>
            PrecisionTrack
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#features" 
            className="text-sm text-[#6B5D4F] hover:text-[#2C2416] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Features
          </a>
          <a 
            href="#how" 
            className="text-sm text-[#6B5D4F] hover:text-[#2C2416] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            className="text-sm text-[#6B5D4F] hover:text-[#2C2416] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Pricing
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="hidden sm:block text-sm text-[#6B5D4F] hover:text-[#2C2416] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Sign in
          </button>
          <button 
            className="px-6 py-2.5 bg-[#C9A87C] text-white rounded-lg hover:bg-[#B89968] transition-all"
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
          >
            Get started
          </button>
        </div>
      </div>
    </motion.header>
  );
}

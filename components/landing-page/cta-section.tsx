'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl font-normal mb-6 text-[#2C2416] leading-tight" style={{ fontFamily: 'Lora, serif' }}>
            Start tracking with
            <br />
            precision today
          </h2>

          <p className="text-xl text-[#6B5D4F] mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            No more searching. No more guessing. Just accurate tracking in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-[#C9A87C] text-white rounded-xl hover:bg-[#B89968] transition-all shadow-sm"
            >
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                Start free trial
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 border border-[#E8D5B5] text-[#6B5D4F] rounded-xl hover:bg-[#FEFBF6] transition-all"
            >
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                See demo
              </span>
            </motion.button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 mb-16 text-sm text-[#8B7355]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C9A87C]" />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C9A87C]" />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C9A87C]" />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>Cancel anytime</span>
            </div>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-12 border-t border-[#E8D5B5]/30"
          >
            <p className="text-sm text-[#8B7355] mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Trusted by thousands of athletes and fitness enthusiasts
            </p>
            <div className="flex justify-center items-center gap-12">
              <div className="text-center">
                <div className="text-3xl font-medium text-[#2C2416] mb-1" style={{ fontFamily: 'Lora, serif' }}>
                  4.9
                </div>
                <div className="text-xs text-[#8B7355]">App Store</div>
              </div>
              <div className="w-px h-12 bg-[#E8D5B5]" />
              <div className="text-center">
                <div className="text-3xl font-medium text-[#2C2416] mb-1" style={{ fontFamily: 'Lora, serif' }}>
                  10k+
                </div>
                <div className="text-xs text-[#8B7355]">Users</div>
              </div>
              <div className="w-px h-12 bg-[#E8D5B5]" />
              <div className="text-center">
                <div className="text-3xl font-medium text-[#2C2416] mb-1" style={{ fontFamily: 'Lora, serif' }}>
                  2M+
                </div>
                <div className="text-xs text-[#8B7355]">Meals tracked</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

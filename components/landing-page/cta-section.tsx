'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthDialog } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const { openDialog } = useAuthDialog();
  return (
    <section className="relative bg-white py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-6 font-normal text-5xl text-[#2C2416] leading-tight lg:text-6xl"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Start tracking with
            <br />
            precision today
          </h2>

          <p
            className="mx-auto mb-12 max-w-2xl text-[#6B5D4F] text-xl leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            No more searching. No more guessing. Just accurate tracking in
            seconds.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="landing-primary"
                size="landing"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
                onClick={() => openDialog('sign-up')}
              >
                Start free trial
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="landing-secondary"
                size="landing"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                See demo
              </Button>
            </motion.div>
          </div>

          {/* Features */}
          <div className="mb-16 flex flex-wrap justify-center gap-8 text-[#8B7355] text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#C9A87C]" />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>
                14-day free trial
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#C9A87C]" />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>
                No credit card required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#C9A87C]" />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-[#E8D5B5]/30 border-t pt-12"
          >
            <p
              className="mb-8 text-[#8B7355] text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Trusted by thousands of athletes and fitness enthusiasts
            </p>
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <div
                  className="mb-1 font-medium text-3xl text-[#2C2416]"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  4.9
                </div>
                <div className="text-[#8B7355] text-xs">App Store</div>
              </div>
              <div className="h-12 w-px bg-[#E8D5B5]" />
              <div className="text-center">
                <div
                  className="mb-1 font-medium text-3xl text-[#2C2416]"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  10k+
                </div>
                <div className="text-[#8B7355] text-xs">Users</div>
              </div>
              <div className="h-12 w-px bg-[#E8D5B5]" />
              <div className="text-center">
                <div
                  className="mb-1 font-medium text-3xl text-[#2C2416]"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  2M+
                </div>
                <div className="text-[#8B7355] text-xs">Meals tracked</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

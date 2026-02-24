'use client';

import {
  BookOpen,
  ChefHat,
  Database,
  MessageSquare,
  Scale,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export function SolutionSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF6] py-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#E8D5B5]/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <span className="mb-4 block font-medium text-[#8B7355] text-sm uppercase tracking-widest">
            How it works
          </span>
          <h2
            className="mb-6 font-normal text-4xl text-[#2C2416] lg:text-5xl"
            style={{ fontFamily: 'Lora, serif' }}
          >
            From messy text to <br /> precise macros in seconds.
          </h2>
          <p
            className="mx-auto max-w-2xl text-[#6B5D4F] text-xl leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Our dual-layer AI pipeline doesn&apos;t just look up keywords. It
            understands context, cooking methods, and regional nuances.
          </p>
        </motion.div>

        {/* AI Pipeline Visualization */}
        <div className="relative mb-32 grid gap-8 md:grid-cols-4">
          {/* Connector Line */}
          <div className="absolute top-12 left-0 -z-10 hidden h-0.5 w-full bg-[#E8D5B5]/30 md:block" />

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-2xl border border-[#E8D5B5]/30 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D5B5] bg-[#FEFBF6] text-[#C9A87C] transition-colors group-hover:bg-[#C9A87C] group-hover:text-white">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-medium text-[#2C2416] text-lg">
              1. Input
            </h3>
            <p className="text-[#6B5D4F] text-sm leading-relaxed">
              You describe your meal naturally. <br />
              <span className="italic">
                &quot;Cơm tấm sườn bì chả, ít mỡ hành.&quot;
              </span>
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative rounded-2xl border border-[#E8D5B5]/30 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D5B5] bg-[#FEFBF6] text-[#C9A87C] transition-colors group-hover:bg-[#C9A87C] group-hover:text-white">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-medium text-[#2C2416] text-lg">
              2. Extraction
            </h3>
            <p className="text-[#6B5D4F] text-sm leading-relaxed">
              AI identifies base ingredients and queries trusted databases
              (FAO/WHO Vietnam).
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative rounded-2xl border border-[#E8D5B5]/30 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D5B5] bg-[#FEFBF6] text-[#C9A87C] transition-colors group-hover:bg-[#C9A87C] group-hover:text-white">
              <ChefHat className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-medium text-[#2C2416] text-lg">
              3. Context
            </h3>
            <p className="text-[#6B5D4F] text-sm leading-relaxed">
              Adjusts for &quot;Saigon style&quot; sweetness or &quot;Hanoi
              style&quot; savory based on your profile.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative rounded-2xl border border-[#E8D5B5]/30 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8D5B5] bg-[#FEFBF6] text-[#C9A87C] transition-colors group-hover:bg-[#C9A87C] group-hover:text-white">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-medium text-[#2C2416] text-lg">
              4. Result
            </h3>
            <p className="text-[#6B5D4F] text-sm leading-relaxed">
              Delivers a transparent macro range, highlighting assumptions for
              you to verify.
            </p>
          </motion.div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E8D5B5]/20">
                <BookOpen className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div>
                <h3
                  className="mb-2 font-medium text-[#2C2416] text-xl"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Persistent Preference Profiles
                </h3>
                <p className="text-[#6B5D4F] leading-relaxed">
                  We verify your habits once—like if you eat chicken skin or how
                  much sugar goes into your braised pork. The AI remembers this
                  forever, so you don&apos;t have to repeat yourself.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E8D5B5]/20">
                <Sparkles className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div>
                <h3
                  className="mb-2 font-medium text-[#2C2416] text-xl"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Transparent Assumptions
                </h3>
                <p className="text-[#6B5D4F] leading-relaxed">
                  The app never guesses blindly. It tells you:{' '}
                  <i>
                    &quot;Calculated braised fish with Southern-style sugar
                    adjustment.&quot;
                  </i>{' '}
                  You can correct it instantly if we&apos;re wrong.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E8D5B5]/20">
                <Scale className="h-5 w-5 text-[#8B7355]" />
              </div>
              <div>
                <h3
                  className="mb-2 font-medium text-[#2C2416] text-xl"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Accuracy Ranges
                </h3>
                <p className="text-[#6B5D4F] leading-relaxed">
                  We don&apos;t pretend to know &quot;347 kcal.&quot; We give
                  you a confident range (e.g., 340-360 kcal) based on ingredient
                  variability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-[#E8D5B5]/40 bg-white shadow-[#C9A87C]/10 shadow-xl"
          >
            <div className="flex items-center justify-between border-[#E8D5B5]/30 border-b bg-[#F9F6F1] px-6 py-4">
              <span className="font-medium text-[#8B7355] text-sm">
                Your Regional Profile
              </span>
              <span className="rounded bg-[#E8D5B5]/20 px-2 py-1 text-[#C9A87C] text-xs">
                Active
              </span>
            </div>

            <div className="space-y-6 p-8">
              <div className="flex items-center justify-between border-[#E8D5B5]/20 border-b pb-4">
                <span className="text-[#6B5D4F]">Region Taste</span>
                <span className="font-medium text-[#2C2416]">
                  Southern (Sweet/Savory)
                </span>
              </div>
              <div className="flex items-center justify-between border-[#E8D5B5]/20 border-b pb-4">
                <span className="text-[#6B5D4F]">Braised Dishes</span>
                <span className="font-medium text-[#2C2416]">High Sugar</span>
              </div>
              <div className="flex items-center justify-between border-[#E8D5B5]/20 border-b pb-4">
                <span className="text-[#6B5D4F]">Chicken Skin</span>
                <span className="font-medium text-[#2C2416]">
                  Always Remove
                </span>
              </div>
              <div className="flex items-center justify-between border-[#E8D5B5]/20 border-b pb-4">
                <span className="text-[#6B5D4F]">Rice Portion</span>
                <span className="font-medium text-[#2C2416]">
                  1.5 Bowls (Default)
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-[#E8D5B5]/30 bg-[#FEFBF6] p-4">
                <p className="text-[#8B7355] text-sm italic">
                  &quot;AI will apply these settings to every generic meal
                  description unless specified otherwise.&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

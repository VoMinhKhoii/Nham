'use client';

import { AlertOctagon, Camera, HelpCircle, Search, X } from 'lucide-react';
import { motion } from 'motion/react';

export function ProblemSection() {
  return (
    <section className='relative overflow-hidden bg-[#FAF9F7] py-24 lg:py-32'>
      {/* Decorative Line */}
      <div className='absolute top-0 left-1/2 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-[#E8D5B5] to-transparent' />

      <div className='relative z-10 mx-auto max-w-[1200px] px-6'>
        {/* Header */}
        <div className='mx-auto max-w-6xl px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='mb-24 text-center'
          >
            <span className='mb-4 block font-medium text-[#8B7355] text-sm uppercase tracking-widest'>
              The Reality
            </span>
            <h2
              className='mb-6 font-normal text-4xl text-[#2C2416] lg:text-6xl'
              style={{ fontFamily: 'Lora, serif' }}
            >
              Western apps fail <br />
              <span className='text-[#A68A64] italic'>at Asian cuisine.</span>
            </h2>
            <p
              className='mx-auto max-w-2xl text-[#6B5D4F] text-xl leading-relaxed'
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Standard tracking tools assume individual portions and simple
              ingredients. They break when faced with shared family meals,
              complex braises, and "a little bit of everything."
            </p>
          </motion.div>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#6B5D4F] max-w-2xl mx-auto leading-relaxed" 
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Standard tracking tools assume individual portions and simple ingredients. They break when faced with shared family meals, complex braises, and "a little bit of everything."
          </motion.p> */}
        </div>

        {/* Problem Cards */}
        <div className='grid gap-6 md:grid-cols-2 lg:gap-10'>
          {/* Photo-Based Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='group relative overflow-hidden rounded-t-[2.5rem] rounded-b-[1rem] border border-[#E8D5B5]/40 bg-[#FEFBF6] p-8 transition-colors duration-500 hover:border-[#C9A87C]/70 lg:p-12'
          >
            {/* Hover Effect Background */}
            <div className='absolute inset-0 bg-[#E8D5B5]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className="relative z-10">
              <div className='mb-8 flex items-center justify-between'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#E6DDD0] text-[#5C4D3C]'>
                  <Camera className='h-5 w-5' />
                </div>
                <span className='rounded-full bg-[#A0522D]/10 px-3 py-1 font-bold text-[#A0522D] text-xs uppercase tracking-wider'>
                  Inaccurate
                </span>
              </div>

              <h3 className='mb-4 font-normal font-serif text-2xl text-[#2C2416]'>
                The "Smart" Camera Illusion
              </h3>

              <p className='mb-8 font-light text-[#6B5D4F] leading-relaxed'>
                Photos see "pork" but miss the hidden calories—the 2 tablespoons
                of sugar and fish sauce absorbed into the meat during braising.
              </p>

              <div className="space-y-3">
                <div className='flex items-start gap-3 rounded-xl border border-[#E8D5B5]/20 bg-white/60 p-4'>
                  <AlertOctagon className='mt-1 h-4 w-4 shrink-0 text-[#A0522D]' />
                  <div>
                    <p className='mb-0.5 font-medium text-[#2C2416] text-sm'>
                      Hidden Oils & Sugars
                    </p>
                    <p className='text-[#8B7355] text-xs'>
                      Visual AI can&apos;t taste the sauce (±300 kcal error).
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 rounded-xl border border-[#E8D5B5]/20 bg-white/60 p-4'>
                  <HelpCircle className='mt-1 h-4 w-4 shrink-0 text-[#A0522D]' />
                  <div>
                    <p className='mb-0.5 font-medium text-[#2C2416] text-sm'>
                      Mixed Dish Confusion
                    </p>
                    <p className='text-[#8B7355] text-xs'>
                      Stir-frys look like a chaotic mess to algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Database Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='group relative overflow-hidden rounded-t-[2.5rem] rounded-b-[1rem] border border-[#E8D5B5]/40 bg-[#FEFBF6] p-8 transition-colors duration-500 hover:border-[#C9A87C]/70 lg:p-12'
          >
            {/* Hover Effect Background */}
            <div className='absolute inset-0 bg-[#E8D5B5]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className="relative z-10">
              <div className='mb-8 flex items-center justify-between'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#E6DDD0] text-[#5C4D3C]'>
                  <Search className='h-5 w-5' />
                </div>
                <span className='rounded-full bg-[#A0522D]/10 px-3 py-1 font-bold text-[#A0522D] text-xs uppercase tracking-wider'>
                  Tedious
                </span>
              </div>

              <h3 className='mb-4 font-normal font-serif text-2xl text-[#2C2416]'>
                Database Fatigue
              </h3>

              <p className='mb-8 font-light text-[#6B5D4F] leading-relaxed'>
                Searching "Phở" returns 50 results ranging from 300 to 900
                calories. Which one is yours? You end up guessing anyway,
                wasting 10 minutes a day.
              </p>

              <div className="space-y-3">
                <div className='flex items-start gap-3 rounded-xl border border-[#E8D5B5]/20 bg-white/60 p-4'>
                  <X className='mt-1 h-4 w-4 shrink-0 text-[#A0522D]' />
                  <div>
                    <p className='mb-0.5 font-medium text-[#2C2416] text-sm'>
                      Manual Entry Burnout
                    </p>
                    <p className='text-[#8B7355] text-xs'>
                      Weighing every ingredient is impossible for shared meals.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3 rounded-xl border border-[#E8D5B5]/20 bg-white/60 p-4'>
                  <X className='mt-1 h-4 w-4 shrink-0 text-[#A0522D]' />
                  <div>
                    <p className='mb-0.5 font-medium text-[#2C2416] text-sm'>
                      Western Bias
                    </p>
                    <p className='text-[#8B7355] text-xs'>
                      Databases lack accurate local Vietnamese data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='relative mt-20 border-[#E8D5B5]/30 border-t pt-16 text-center'
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF9F7] px-4 text-[#C9A87C]">
            <span className='font-serif text-4xl'>&quot;</span>
          </div>

          <p className='mx-auto max-w-4xl font-serif text-2xl text-[#5C4D3C] italic leading-normal lg:text-3xl'>
            The only tracking method accurate enough for Vietnamese home cooking
            is natural language description.
          </p>
          <div className='mt-6 flex items-center justify-center gap-3'>
            <div className="h-px w-8 bg-[#C9A87C]" />
            <span className='font-bold text-[#8B7355] text-xs uppercase tracking-widest'>
              Core Philosophy
            </span>
            <div className="h-px w-8 bg-[#C9A87C]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

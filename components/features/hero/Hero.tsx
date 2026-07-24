"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  return (
    <section id="product" className="relative">
      <div className="min-h-screen  flex flex-col justify-center px-[5vw] max-w-[900px]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="font-mono text-xs tracking-[0.14em] text-signal mb-6 uppercase flex items-center gap-2.5"
          >
            Intelligence Workspace
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-semibold tracking-tight leading-[1.02] text-[clamp(40px,7vw,84px)] max-w-[14ch]"
          >
            Every signal, <span className="text-text-dim">structured.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg leading-relaxed text-text-dim max-w-[46ch]"
          >
            Xai turns raw, disconnected data into a live map of what matters -
            then acts on it. Built for teams who make decisions on evidence, not
            dashboards full of noise.
          </motion.p>

          <motion.div variants={item} className="flex gap-3.5 mt-10">
            <button className="px-6 py-3.5 rounded-lg font-medium text-[14.5px] bg-text text-bg hover:bg-white hover:-translate-y-px transition-all">
              See it in motion
            </button>
            <button className="px-6 py-3.5 rounded-lg font-medium text-[14.5px] border border-border-strong hover:border-text-dim transition-all">
              Read the docs
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] text-text-faint tracking-wider flex items-center gap-2"
      >
        SCROLL TO STRUCTURE ↓
      </motion.div>
    </section>
  );
};

export default Hero;

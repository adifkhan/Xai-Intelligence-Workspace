"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = Math.min(1, v * 1.4);
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="product" ref={sectionRef} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mesh-bg" />
        <div
          className="glow-orb h-[420px] w-[420px] bg-accent/30"
          style={{ top: "-8%", left: "-6%" }}
        />
        <div
          className="glow-orb h-[380px] w-[380px] bg-violet/25"
          style={{ top: "10%", right: "-8%" }}
        />
        <div
          className="glow-orb h-[300px] w-[300px] bg-signal/10"
          style={{ bottom: "-10%", left: "30%" }}
        />

        <div className="absolute inset-0">
          <HeroScene progress={progress} />
        </div>

        <motion.div
          style={{ opacity, y: textY }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs tracking-widest text-ink-300"
          >
            INTELLIGENCE WORKSPACE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-gradient-accent text-glow max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            Raw data, quietly
            <br />
            becoming intelligence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-lg text-balance text-base text-ink-400 md:text-lg"
          >
            Xai ingests your messy, unstructured signal and organizes it into
            decisions you can act on — calmly, and in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-base-950 transition-transform duration-300 hover:scale-[1.03]">
              See it in motion
            </button>
            <button className="rounded-full border border-white/10 px-6 py-3 text-sm text-ink-100 transition-colors duration-300 hover:bg-white/5">
              Read the docs
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 font-mono text-xs tracking-widest text-ink-400"
          >
            SCROLL TO STRUCTURE ↓
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

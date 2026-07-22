"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    label: "01",
    title: "Ingest Data",
    copy: "Streams, documents, logs, and events flow in from every connected source, unfiltered and untouched.",
  },
  {
    label: "02",
    title: "Analyze with AI",
    copy: "Xai's models find structure - entities, patterns, and relationships - inside the noise.",
  },
  {
    label: "03",
    title: "Generate Insight",
    copy: "The structure resolves into a single, decision-ready signal your team can act on immediately.",
  },
];

const InsightFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".stage-panel");

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (stages.length - 1)}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(
            stages.length - 1,
            Math.floor(self.progress * stages.length),
          );
          setActive(idx);
        },
      });

      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel.querySelector(".stage-line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * (stages.length - 1)}`,
              scrub: 0.6,
            },
          },
        );
      });

      return () => st.kill();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="insight-flow"
      ref={containerRef}
      className="relative flex h-screen items-center overflow-hidden bg-base-900"
    >
      <div className="mesh-bg opacity-70" />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-8 md:grid-cols-2">
        <div className="stage-panel">
          <p className="mb-4 font-mono text-xs tracking-widest text-ink-400">
            HOW IT WORKS
          </p>
          <div className="space-y-1">
            {stages.map((s, i) => {
              const isActive = active === i;
              const isHovered = hovered === i;
              return (
                <button
                  key={s.label}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() =>
                    window.scrollTo({
                      top:
                        (containerRef.current?.offsetTop ?? 0) +
                        (i / stages.length) *
                          window.innerHeight *
                          stages.length,
                      behavior: "smooth",
                    })
                  }
                  className="group relative flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId={`stage-hover-pill-${isActive ? "active" : "hover"}-${i}`}
                      className="absolute inset-0 rounded-xl bg-white/[0.04]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-mono text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-accent"
                        : isHovered
                          ? "text-ink-100"
                          : "text-ink-400"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`relative z-10 flex-1 text-2xl font-medium transition-all duration-300 md:text-3xl ${
                      isActive
                        ? "translate-x-1 text-ink-100"
                        : isHovered
                          ? "translate-x-1 text-ink-100/80"
                          : "text-ink-400/50"
                    }`}
                  >
                    {s.title}
                  </span>
                  <motion.span
                    className="relative z-10 text-accent"
                    initial={false}
                    animate={{
                      opacity: isActive || isHovered ? 1 : 0,
                      x: isActive || isHovered ? 0 : -6,
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    →
                  </motion.span>
                </button>
              );
            })}
          </div>
          <div className="stage-line mt-8 h-px w-full origin-left bg-gradient-to-r from-accent to-transparent" />
        </div>

        <div className="relative h-72">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="panel absolute inset-0 rounded-2xl p-8"
            >
              <div className="mb-6 flex gap-2">
                {stages.map((s, i) => (
                  <div key={i} className="group/dot relative flex-1">
                    <span
                      className={`block h-1 rounded-full transition-all duration-300 group-hover/dot:h-1.5 ${
                        i <= active
                          ? "bg-accent"
                          : "bg-white/10 group-hover/dot:bg-white/20"
                      }`}
                    />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-base-700 px-2 py-1 text-[10px] tracking-wide text-ink-300 opacity-0 shadow-lg transition-opacity duration-200 group-hover/dot:opacity-100">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
              <h3 className="mb-3 text-2xl font-medium text-ink-100">
                {stages[active].title}
              </h3>
              <p className="text-ink-400">{stages[active].copy}</p>

              <div className="mt-8 flex gap-1.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="h-8 w-1 rounded-full bg-accent/60"
                    animate={{
                      height: active === 1 ? [12, 32, 12] : 12,
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: active === 1 ? Infinity : 0,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InsightFlow;

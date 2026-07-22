"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SignatureScene = dynamic(() => import("./SignatureScene"), {
  ssr: false,
});

const SignatureInteraction = () => {
  const [organized, setOrganized] = useState(false);

  return (
    <section
      id="automations"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-900 px-6 py-32"
    >
      <div className="mesh-bg" />
      <div
        className="glow-orb h-[360px] w-[360px] bg-signal/10"
        style={{ top: "15%", right: "5%" }}
      />

      <div className="absolute inset-0">
        <SignatureScene organized={organized} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-lg text-center"
      >
        <p className="mb-4 font-mono text-xs tracking-widest text-ink-400">
          SIGNATURE INTERACTION
        </p>
        <h2 className="mb-4 text-3xl font-medium text-ink-100 md:text-4xl">
          Find the one thread
          <br />
          that matters.
        </h2>
        <p className="mb-8 text-ink-400">
          This is a real data mesh - every node connects to its nearest
          neighbors, same as raw signal does. Trigger the automation and Xai
          traces the single causal path across it, dimming the noise and
          lighting the thread in <span className="text-signal">teal</span>. Move
          your cursor to look around the mesh.
        </p>

        <button
          onClick={() => setOrganized((v) => !v)}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-base-950 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          {organized ? "Reset to raw mesh" : "Trace the insight"}
        </button>
      </motion.div>
    </section>
  );
};

export default SignatureInteraction;

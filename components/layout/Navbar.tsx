"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const links = ["Product", "Insight Flow", "Dashboard", "Automations"];

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-[5vw] py-5 backdrop-blur-md bg-gradient-to-b from-bg/85 to-transparent"
    >
      <a href="#product" className="hover:text-text transition-colors">
        <Image src="/xai-white.png" alt="logo" width={50} height={50} />
      </a>

      <nav className="hidden md:flex items-center gap-8 text-sm text-text-dim">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
            className="hover:text-text transition-colors"
          >
            {l}
          </a>
        ))}
      </nav>

      <button className="font-mono text-[13px] border border-border-strong rounded-md px-4 py-2 hover:border-signal hover:bg-signal/10 transition-colors">
        Request access
      </button>
    </motion.header>
  );
};

export default Navbar;

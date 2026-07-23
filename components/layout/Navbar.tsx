"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const links = ["Product", "Insight Flow", "Dashboard", "Automations"];

import React from "react";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-5"
    >
      <div className="flex items-center gap-2">
        <Image src="/xai-white.png" alt="logo" width={50} height={50} />
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
            className="text-sm text-ink-400 hover:text-ink-100 transition-colors duration-300"
          >
            {l}
          </a>
        ))}
      </nav>

      <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-ink-100 hover:bg-white/5 transition-colors duration-300">
        Request Access
      </button>
    </motion.header>
  );
};

export default Navbar;

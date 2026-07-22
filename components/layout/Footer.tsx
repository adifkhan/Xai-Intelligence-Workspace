import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-base-950 px-8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink-400 md:flex-row">
        <span className="font-mono text-xs tracking-widest">
          XAI - INTELLIGENCE WORKSPACE
        </span>
        <span>© 2026 Xai. Built as a frontend engineering exercise.</span>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import NavCard from "./NavCard";
import OverviewTab from "./OverviewTab";
import SignalsTab from "./SignalsTab";
import AnimationTab from "./AnimationTab";

const NAV_ITEMS = ["Overview", "Signals", "Automations", "Sources", "Settings"];
const TABS = ["overview", "signals", "automations"] as const;
type Tab = (typeof TABS)[number];

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Overview");
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <section id="dashboard" className="py-16 pb-60">
      <div className="px-[5vw] mb-6">
        <div className="font-mono text-xs text-text-faint tracking-widest uppercase mb-3.5">
          INTELLIGENCE DASHBOARD
        </div>
        <h2 className="font-display font-semibold tracking-tight text-[clamp(28px,4vw,42px)]">
          One workspace for every signal.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-[5vw] border border-border rounded-2xl bg-gradient-to-b from-bg-elev to-bg min-h-[560px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] grid grid-cols-1 overflow-hidden md:grid-cols-[220px_1fr]"
      >
        <aside className="border-b border-white/5 p-5 md:border-b-0 md:border-r">
          <div className="font-mono text-xs text-text-faint px-2.5 pb-5 tracking-wide">
            WORKSPACE
          </div>
          <div className="space-y-1">
            {NAV_ITEMS.map((label, i) => (
              <NavCard
                key={label}
                label={label}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
              />
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex gap-1 px-6 pt-4 border-b border-border">
            {TABS.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[13.5px] font-medium px-3.5 py-2.5 cursor-pointer border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "text-text border-signal"
                    : "text-text-dim border-transparent hover:text-text"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="p-6 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNav}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && <OverviewTab />}

                {activeTab === "signals" && <SignalsTab />}

                {activeTab === "automations" && <AnimationTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Dashboard;

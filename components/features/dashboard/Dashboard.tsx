"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrendChart from "./TrendChart";

const navItems = [
  { key: "overview", label: "Overview" },
  { key: "signals", label: "Signals" },
  { key: "automations", label: "Automations" },
];

const mockRows = [
  { name: "Revenue anomaly", conf: 96, status: "Reviewed" },
  { name: "Churn risk - Segment B", conf: 88, status: "Pending" },
  { name: "Supply delay forecast", conf: 91, status: "Reviewed" },
  { name: "Pricing elasticity shift", conf: 74, status: "Pending" },
];

const Dashboard = () => {
  const [tab, setTab] = useState("overview");

  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-base-950 px-6 py-32"
    >
      <div className="mesh-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-xl"
        >
          <p className="mb-3 font-mono text-xs tracking-widest text-ink-400">
            INTELLIGENCE DASHBOARD
          </p>
          <h2 className="text-3xl font-medium text-ink-100 md:text-4xl">
            One workspace for every signal.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="panel grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-[220px_1fr]"
        >
          {/* Sidebar */}
          <div className="border-b border-white/5 p-5 md:border-b-0 md:border-r">
            <p className="mb-6 font-mono text-xs tracking-widest text-ink-400">
              WORKSPACE
            </p>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className="group relative w-full rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors duration-300 hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {tab === item.key && (
                    <motion.span
                      layoutId="dash-tab-highlight"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      tab === item.key
                        ? "text-ink-100"
                        : "text-ink-400 group-hover:text-ink-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-4">
                  <TrendChart />
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { label: "Signals processed", value: "12,482" },
                    { label: "Avg. confidence", value: "89%" },
                    { label: "Actions triggered", value: "214" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.04]"
                    >
                      <p className="text-xs text-ink-400">{card.label}</p>
                      <p className="mt-2 text-xl font-medium text-ink-100 transition-colors duration-300 group-hover:text-white">
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-xl border border-white/5">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-ink-400">
                        <th className="px-4 py-3 font-normal">Insight</th>
                        <th className="px-4 py-3 font-normal">Confidence</th>
                        <th className="px-4 py-3 font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRows.map((row, i) => (
                        <motion.tr
                          key={row.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="border-b border-white/5 text-ink-100 last:border-none hover:bg-white/[0.02]"
                        >
                          <td className="px-4 py-3">{row.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full bg-accent"
                                  style={{ width: `${row.conf}%` }}
                                />
                              </div>
                              <span className="text-ink-400">{row.conf}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                row.status === "Reviewed"
                                  ? "bg-accent/10 text-accent"
                                  : "bg-white/5 text-ink-400"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;

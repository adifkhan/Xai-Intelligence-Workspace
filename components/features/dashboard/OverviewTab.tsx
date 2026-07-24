import { motion } from "framer-motion";
import TrendChart from "./TrendChart";
import SignalTable from "./SignalTable";

const OverviewTab = () => {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-3.5 mb-5">
        {[
          {
            label: "Signals today",
            value: "312",
            delta: "↑ 18% vs yesterday",
          },
          {
            label: "Confidence avg",
            value: "94.2%",
            delta: "↑ 1.1pt",
          },
          { label: "Automations run", value: "47", delta: "↑ 6" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-1 border border-border rounded-[10px] p-4 bg-bg-elev transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.04]"
          >
            <div className="font-mono text-[11px] text-text-faint uppercase tracking-wide">
              {s.label}
            </div>
            <div className="font-display text-[26px] font-semibold mt-2">
              {s.value}
            </div>
            <div className="font-mono text-[11.5px] text-signal mt-1.5">
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <TrendChart />
      </div>

      <SignalTable />
    </motion.div>
  );
};

export default OverviewTab;

import { motion } from "framer-motion";
import { useState } from "react";

const RULES = [
  {
    name: "Escalate high-impact churn signals",
    desc: "Notify account owner within 5 minutes",
    on: true,
  },
  {
    name: "Auto-merge duplicate entities",
    desc: "Confidence above 95%",
    on: true,
  },
  {
    name: "Draft weekly summary",
    desc: "Sent to workspace admins, Monday 9am",
    on: false,
  },
  {
    name: "Flag pricing anomalies",
    desc: "Compare against last 30 days",
    on: true,
  },
];

const AnimationTab = () => {
  const [rules, setRules] = useState(RULES);
  return (
    <motion.div
      key="automations"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {rules.map((rule, i) => (
        <div
          key={rule.name}
          className="flex items-center justify-between py-3.5 px-1 border-b border-border last:border-b-0"
        >
          <div>
            <div className="text-[13.5px]">{rule.name}</div>
            <div className="text-xs text-text-faint mt-0.5">{rule.desc}</div>
          </div>
          <div
            onClick={() =>
              setRules((r) =>
                r.map((x, xi) => (xi === i ? { ...x, on: !x.on } : x)),
              )
            }
            className={`w-[34px] h-[19px] rounded-full border relative cursor-pointer transition-colors flex-shrink-0 ${
              rule.on
                ? "bg-signal/20 border-signal"
                : "bg-bg-elev-2 border-border-strong"
            }`}
          >
            <motion.div
              layout
              className={`absolute top-[2px] w-[13px] h-[13px] rounded-full ${rule.on ? "bg-signal left-[17px]" : "bg-text-faint left-[2px]"}`}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default AnimationTab;

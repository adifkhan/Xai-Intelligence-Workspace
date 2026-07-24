import { motion } from "framer-motion";

const SignalsTab = () => {
  return (
    <motion.div
      key="signals"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {["Signal", "Confidence", "Impact", "Status"].map((h) => (
              <th
                key={h}
                className="text-left font-mono text-[11px] text-text-faint font-normal p-2.5 uppercase border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            [
              "Support volume trending up, billing",
              "91%",
              "Medium",
              "warn",
              "Reviewing",
            ],
            [
              "New competitor pricing detected",
              "88%",
              "High",
              "warn",
              "Reviewing",
            ],
            [
              "Churn risk cluster, enterprise tier",
              "96%",
              "High",
              "ok",
              "Actioned",
            ],
            [
              "Warehouse inventory drift, SKU-1042",
              "83%",
              "Low",
              "ok",
              "Resolved",
            ],
          ].map((row) => (
            <tr key={row[0]} className="hover:bg-bg-elev-2">
              <td className="p-2.5 border-b border-border text-text-dim">
                {row[0]}
              </td>
              <td className="p-2.5 border-b border-border text-text-dim">
                {row[1]}
              </td>
              <td className="p-2.5 border-b border-border text-text-dim">
                {row[2]}
              </td>
              <td className="p-2.5 border-b border-border">
                <span
                  className={`font-mono text-[11px] px-2 py-1 rounded-md ${row[3] === "ok" ? "bg-signal/15 text-signal" : "bg-insight/15 text-insight"}`}
                >
                  {row[4]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default SignalsTab;

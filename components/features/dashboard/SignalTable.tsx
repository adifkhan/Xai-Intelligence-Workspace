import React from "react";

const SignalTable = () => {
  return (
    <table className="w-full border-collapse text-[13px]">
      <thead>
        <tr>
          <th className="text-left font-mono text-[11px] text-text-faint font-normal p-2.5 uppercase border-b border-border">
            Signal
          </th>
          <th className="text-left font-mono text-[11px] text-text-faint font-normal p-2.5 uppercase border-b border-border">
            Source
          </th>
          <th className="text-left font-mono text-[11px] text-text-faint font-normal p-2.5 uppercase border-b border-border">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {[
          [
            "Checkout latency spike, EU region",
            "infra-metrics",
            "warn",
            "Reviewing",
          ],
          ["Duplicate customer entities merged", "crm-sync", "ok", "Resolved"],
          ["Unusual refund cluster, SKU-2291", "orders", "ok", "Resolved"],
        ].map((row) => (
          <tr key={row[0]} className="hover:bg-bg-elev-2">
            <td className="p-2.5 border-b border-border text-text-dim">
              {row[0]}
            </td>
            <td className="p-2.5 border-b border-border text-text-dim">
              {row[1]}
            </td>
            <td className="p-2.5 border-b border-border">
              <span
                className={`font-mono text-[11px] px-2 py-1 rounded-md ${row[2] === "ok" ? "bg-signal/15 text-signal" : "bg-insight/15 text-insight"}`}
              >
                {row[3]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SignalTable;

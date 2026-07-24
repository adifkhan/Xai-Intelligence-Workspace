import { useState } from "react";
import { motion } from "framer-motion";

const trendValues = [
  22, 28, 24, 34, 30, 42, 38, 50, 46, 58, 54, 66, 62, 74, 70, 82, 78, 90, 86,
  98, 94,
];

const TrendChart = () => {
  const w = 480;
  const h = 140;
  const max = Math.max(...trendValues);
  const min = Math.min(...trendValues);
  const step = w / (trendValues.length - 1);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const points = trendValues.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / (max - min)) * (h - 20) - 10;
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * w;
    const idx = Math.round(relX / step);
    setHoverIdx(Math.min(points.length - 1, Math.max(0, idx)));
  };

  const active = hoverIdx !== null ? hoverIdx : points.length - 1;
  const [activeX, activeY] = points[active];

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-white/10">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-ink-400">Insight volume - last 12 weeks</p>
        <span className="text-xs text-signal">▲ 24%</span>
      </div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full cursor-crosshair overflow-visible"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#trendFill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#7FA3FF"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.line
            x1={activeX}
            x2={activeX}
            y1={0}
            y2={h}
            stroke="#8A93A3"
            strokeWidth={1}
            strokeDasharray="3 3"
            animate={{ opacity: hoverIdx !== null ? 0.5 : 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.circle
            cx={activeX}
            cy={activeY}
            r={5}
            fill="#5EEAD4"
            stroke="#07080A"
            strokeWidth={2}
            animate={{ scale: hoverIdx !== null ? 1.15 : 1 }}
            transition={{ duration: 0.15 }}
          />
        </svg>

        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-base-700 px-2.5 py-1.5 text-xs shadow-xl transition-opacity duration-150"
          style={{
            left: `${(activeX / w) * 100}%`,
            opacity: hoverIdx !== null ? 1 : 0,
          }}
        >
          <p className="text-ink-400">Week {active + 1}</p>
          <p className="font-medium text-ink-100">
            {trendValues[active]} insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;

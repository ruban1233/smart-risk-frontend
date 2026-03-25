/**
 * PayoffChart.jsx
 * Path: D:\FRONTEND\SMARTFIN\SRC\components\strategy\PayoffChart.jsx
 *
 * Already exists in your structure — replace content with this.
 * Uses recharts (already installed in your project).
 *
 * Props:
 *   payoff : [{ price, pl }, ...]
 *   atm    : number (ATM strike — shown as reference line)
 */

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

function PayoffChart({ payoff, atm }) {
  if (!payoff || payoff.length === 0) return null;

  // Normalize different field names backend might return
  const data = payoff.map((d) => ({
    price: d.price ?? d.spot ?? d.strike ?? 0,
    pl:    d.pl    ?? d.pnl  ?? d.value  ?? 0,
  }));

  const maxPL = Math.max(...data.map((d) => d.pl));
  const minPL = Math.min(...data.map((d) => d.pl));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const pl = payload[0]?.value;
    return (
      <div style={{
        background:   "#1f2937",
        padding:      "8px 14px",
        borderRadius: 8,
        border:       "1px solid #374151",
        fontSize:     13,
      }}>
        <div style={{ color: "#9ca3af" }}>
          Price: <strong style={{ color: "#fff" }}>
            {Number(label).toLocaleString("en-IN")}
          </strong>
        </div>
        <div style={{ color: pl >= 0 ? "#4ade80" : "#f87171" }}>
          P&L: <strong>
            ₹{Number(pl).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </strong>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Stats row */}
      <div style={styles.statsRow}>
        <span style={styles.stat}>
          Max Profit:&nbsp;
          <strong style={{ color: "#16a34a" }}>
            ₹{maxPL.toLocaleString("en-IN")}
          </strong>
        </span>
        <span style={styles.divider}>|</span>
        <span style={styles.stat}>
          Max Loss:&nbsp;
          <strong style={{ color: "#dc2626" }}>
            ₹{Math.abs(minPL).toLocaleString("en-IN")}
          </strong>
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="gainGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

          <XAxis
            dataKey="price"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickFormatter={(v) => Number(v).toLocaleString("en-IN")}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickFormatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Zero line */}
          <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 4" />

          {/* ATM line */}
          {atm && (
            <ReferenceLine
              x={atm}
              stroke="#7c3aed"
              strokeDasharray="4 4"
              label={{ value: "ATM", position: "top", fontSize: 11, fill: "#7c3aed" }}
            />
          )}

          <Area
            type="monotone"
            dataKey="pl"
            stroke="#22c55e"
            strokeWidth={2.5}
            fill="url(#gainGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "#22c55e" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  statsRow: {
    display:      "flex",
    gap:          12,
    alignItems:   "center",
    marginBottom: 10,
    fontSize:     13,
    color:        "#374151",
  },
  stat:    {},
  divider: { color: "#d1d5db" },
};

export default PayoffChart;
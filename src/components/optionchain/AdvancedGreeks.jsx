/**
 * AdvancedGreeks.jsx
 * Path: D:\FRONTEND\SMARTFIN\SRC\components\optionchain\AdvancedGreeks.jsx
 *
 * Already exists in your structure — replace content with this.
 * Used by OptionTrading.jsx to display Delta, Gamma, Theta, Vega
 *
 * Props:
 *   greeks : { delta, gamma, theta, vega }
 */

import React from "react";

const GREEK_META = [
  { key: "delta", label: "Delta", desc: "Direction sensitivity",  color: "#2563eb" },
  { key: "gamma", label: "Gamma", desc: "Delta change rate",      color: "#7c3aed" },
  { key: "theta", label: "Theta", desc: "Time decay / day",       color: "#dc2626" },
  { key: "vega",  label: "Vega",  desc: "IV sensitivity (1%)",    color: "#059669" },
];

function AdvancedGreeks({ greeks }) {
  if (!greeks) return null;

  return (
    <div style={styles.row}>
      {GREEK_META.map(({ key, label, desc, color }) => {
        const val = greeks[key];
        return (
          <div key={key} style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
            <div style={{ ...styles.gLabel, color }}>{label}</div>
            <div style={{ ...styles.gVal, color }}>
              {val !== undefined && val !== null
                ? Number(val).toFixed(4)
                : "—"}
            </div>
            <div style={styles.gDesc}>{desc}</div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  row: {
    display:  "flex",
    gap:      14,
    flexWrap: "wrap",
  },
  card: {
    flex:            "1 1 140px",
    padding:         "14px 16px",
    border:          "1px solid #e5e7eb",
    borderRadius:    10,
    backgroundColor: "#fff",
    boxShadow:       "0 1px 3px rgba(0,0,0,0.05)",
    textAlign:       "center",
  },
  gLabel: {
    fontSize:      12,
    fontWeight:    700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom:  6,
  },
  gVal: {
    fontSize:     24,
    fontWeight:   700,
    marginBottom: 4,
  },
  gDesc: {
    fontSize: 11,
    color:    "#9ca3af",
  },
};

export default AdvancedGreeks;
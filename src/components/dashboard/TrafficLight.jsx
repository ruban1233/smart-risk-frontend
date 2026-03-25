/**
 * TrafficLight.jsx
 * Path: D:\FRONTEND\SMARTFIN\SRC\components\dashboard\TrafficLight.jsx
 *
 * Already exists in your structure — replace content with this.
 * Used by OptionTrading.jsx
 */

import React from "react";

function TrafficLight({ signal }) {
  if (!signal) return null;

  const { signal: level, color, message } = signal;

  const lights = [
    { id: "RED",    bg: "#ef4444", label: "Danger"  },
    { id: "YELLOW", bg: "#f59e0b", label: "Caution" },
    { id: "GREEN",  bg: "#22c55e", label: "Safe"    },
  ];

  return (
    <div style={styles.card}>
      <div style={styles.label}>Risk Signal</div>

      <div style={styles.housing}>
        {lights.map((l) => (
          <div
            key={l.id}
            title={l.label}
            style={{
              ...styles.bulb,
              backgroundColor: level === l.id ? l.bg : "#374151",
              boxShadow:
                level === l.id
                  ? `0 0 10px ${l.bg}, 0 0 20px ${l.bg}55`
                  : "none",
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color, marginTop: 8 }}>
        {level}
      </div>
      <div style={styles.msg}>{message}</div>
    </div>
  );
}

const styles = {
  card: {
    flex:            "0 0 auto",
    minWidth:        160,
    padding:         "14px 18px",
    border:          "1px solid #e5e7eb",
    borderRadius:    10,
    backgroundColor: "#fff",
    boxShadow:       "0 1px 3px rgba(0,0,0,0.05)",
    display:         "flex",
    flexDirection:   "column",
    alignItems:      "center",
  },
  label: {
    alignSelf:     "flex-start",
    fontSize:      11,
    color:         "#6b7280",
    fontWeight:    600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom:  10,
  },
  housing: {
    display:         "flex",
    flexDirection:   "column",
    gap:             8,
    backgroundColor: "#1f2937",
    padding:         "10px 14px",
    borderRadius:    14,
  },
  bulb: {
    width:        26,
    height:       26,
    borderRadius: "50%",
    transition:   "box-shadow 0.3s, background-color 0.3s",
  },
  msg: {
    fontSize:  11,
    color:     "#6b7280",
    textAlign: "center",
    marginTop: 5,
    maxWidth:  140,
  },
};

export default TrafficLight;
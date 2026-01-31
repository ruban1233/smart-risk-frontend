import React from "react";

export default function RSIBar({ value = 71.5 }) {
  const width = Math.min(100, (value / 100) * 100);

  const color =
    value > 70 ? "#ff4d4d" : value < 30 ? "#00ff7f" : "#00e1ff";

  return (
    <div className="w-full bg-[#0d1117] h-3 rounded-full overflow-hidden shadow-inner">
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      ></div>
    </div>
  );
}

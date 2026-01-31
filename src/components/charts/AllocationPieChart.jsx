import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#2563eb", // blue - equity
  "#16a34a", // green - debt
  "#f59e0b", // gold
  "#dc2626", // red - stocks
  "#6b7280", // gray - cash
];

function AllocationPieChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <PieChart width={350} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default AllocationPieChart;

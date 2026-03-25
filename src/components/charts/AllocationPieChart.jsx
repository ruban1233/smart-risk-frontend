import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#6B7280",
];

function AllocationPieChart({ allocation }) {

  if (!allocation) return null;

  const data = [
    { name: "Stocks", value: allocation.stocks },
    { name: "ETF", value: allocation.etf },
    { name: "Mutual Funds", value: allocation.mutual_funds },
    { name: "Gold", value: allocation.gold },
    { name: "Cash", value: allocation.cash },
  ];

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Capital Allocation</h3>

      <PieChart width={420} height={320}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={120}
          paddingAngle={3}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default AllocationPieChart;
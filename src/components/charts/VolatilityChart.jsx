import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function VolatilityChart() {
  const data = {
    labels: ["IV 1", "IV 2", "IV 3", "IV 4", "IV 5"],
    datasets: [
      {
        label: "IV",
        data: [12.5, 13.2, 12.9, 14.1, 13.8],
        borderColor: "#ffcc00",
        backgroundColor: "rgba(255, 204, 0, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: {
        ticks: { color: "#9da9b5" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-40">
      <Line data={data} options={options} />
    </div>
  );
}

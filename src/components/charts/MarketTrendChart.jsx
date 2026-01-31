import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

export default function MarketTrendChart() {
  const data = {
    labels: ["9:15", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00"],
    datasets: [
      {
        label: "NIFTY Trend",
        data: [19200, 19280, 19340, 19290, 19450, 19520, 19600], // HARD CODED STATIC DATA
        borderColor: "#00e1ff",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(0,225,255,0.15)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: "#9da9b5", font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#9da9b5", font: { size: 12 } },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
}

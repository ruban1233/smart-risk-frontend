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

export default function MiniTrendChart() {
  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Mini Trend",
        data: [10, 25, 20, 30, 42],
        borderColor: "#00ff7f",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
}

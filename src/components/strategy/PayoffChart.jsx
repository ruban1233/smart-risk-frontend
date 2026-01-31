import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function PayoffChart({ chart }) {
  const data = {
    labels: chart.x,
    datasets: [
      {
        data: chart.y,
        borderColor: "#1d3557",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  };

  const options = {
    scales: {
      x: { display: true },
      y: { display: true },
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-80">
      <Line data={data} options={options} />
    </div>
  );
}

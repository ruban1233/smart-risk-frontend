import React, { useState } from "react";
import { Line } from "react-chartjs-2";

export default function Lumpsum() {
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const gain = futureValue - amount;

  const chartData = {
    labels: ["Invested", "Wealth Gain"],
    datasets: [
      {
        label: "Amount",
        data: [amount, gain],
        backgroundColor: ["#4e79a7", "#f28e2b"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Lumpsum Calculator</h2>

      <label className="block mt-4 text-gray-600">Investment Amount (₹)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-3 border rounded-lg mt-1"
      />

      <label className="block mt-4 text-gray-600">Expected CAGR (%)</label>
      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
        className="w-full p-3 border rounded-lg mt-1"
      />

      <label className="block mt-4 text-gray-600">Time Period (Years)</label>
      <input
        type="number"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
        className="w-full p-3 border rounded-lg mt-1"
      />

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">
          Invested Amount:{" "}
          <span className="font-semibold text-gray-800">
            ₹{amount.toLocaleString()}
          </span>
        </p>

        <p className="text-gray-600 mt-1">
          Wealth Gain:{" "}
          <span className="font-semibold text-green-600">
            ₹{gain.toLocaleString()}
          </span>
        </p>

        <p className="text-gray-600 mt-1">
          Future Value:{" "}
            <span className="font-bold text-blue-600">
              ₹{futureValue.toLocaleString()}
            </span>
        </p>
      </div>

      <div className="mt-6">
        <Line data={chartData} />
      </div>
    </div>
  );
}

import React from "react";

export default function StrategySummary({ summary }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">

      <h2 className="text-xl font-semibold text-[#1d3557] mb-4">
        Strategy Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        
        <div className="p-4 border rounded-lg">
          <p className="text-gray-600 text-sm">Max Profit</p>
          <p className="text-green-600 text-xl font-bold">
            ₹ {summary.maxProfit}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-gray-600 text-sm">Max Loss</p>
          <p className="text-red-600 text-xl font-bold">
            ₹ {summary.maxLoss}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-gray-600 text-sm">Breakevens</p>
          <p className="text-gray-800 text-lg"> {summary.breakevens} </p>
        </div>
      </div>
    </div>
  );
}

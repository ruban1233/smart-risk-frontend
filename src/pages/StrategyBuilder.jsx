import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function StrategyBuilder() {
  const [data, setData] = useState(null);
  const [trend, setTrend] = useState("sideways");

  const fetchStrategy = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/strategy/?trend=${trend}`
      );
      setData(res.data);
    } catch (err) {
      console.log("Error loading strategy", err);
    }
  }, [trend]);

  useEffect(() => {
    fetchStrategy();
  }, [fetchStrategy]);

  if (!data)
    return <div className="p-5 text-white">Loading strategy...</div>;

  return (
    <div className="p-6 space-y-6 text-white">

      {/* Page Title */}
      <h1 className="text-3xl font-bold">🎯 SmartRisk Strategy Builder</h1>

      {/* Trend Selector */}
      <div className="mb-4">
        <select
          value={trend}
          onChange={(e) => setTrend(e.target.value)}
          className="bg-gray-800 p-3 rounded-lg"
        >
          <option value="bullish">Bullish</option>
          <option value="bearish">Bearish</option>
          <option value="sideways">Sideways</option>
          <option value="volatile">High Volatility</option>
        </select>
      </div>

      {/* Strategy Card */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">

        {/* Strategy Title */}
        <h2 className="text-2xl font-bold">
          📌 Recommended Strategy: <span className="text-yellow-300">{data.strategy}</span>
        </h2>

        {/* Risk */}
        <p className="text-gray-300 text-lg">
          🔥 <span className="font-semibold">Risk Level:</span> {data.risk_level}
        </p>

        {/* Max Profit / Loss */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-gray-400">Max Profit</p>
            <p className="text-2xl text-green-400 font-bold">{data.max_profit}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-gray-400">Max Loss</p>
            <p className="text-2xl text-red-400 font-bold">{data.max_loss}</p>
          </div>
        </div>

        {/* POP */}
        <p className="text-gray-300 text-lg mt-4">
          🎯 Probability of Profit (POP): <span className="font-bold">{data.pop}%</span>
        </p>

        {/* Risk Score */}
        <p className="text-gray-300 text-lg">
          🧠 Risk Score: <span className="font-bold">{data.risk_score}/10</span>
        </p>

      </div>

      {/* Beginner View */}
      <div className="bg-gray-800 p-6 rounded-xl shadow space-y-2">
        <h3 className="text-xl font-bold">👶 Beginner View</h3>
        <p className="text-gray-300 whitespace-pre-line">{data.beginner_view}</p>
      </div>

      {/* Advanced View */}
      <div className="bg-gray-800 p-6 rounded-xl shadow space-y-2">
        <h3 className="text-xl font-bold">🎓 Advanced View</h3>
        <p className="text-gray-300 whitespace-pre-line">{data.advanced_view}</p>
      </div>

      {/* Professional View */}
      <div className="bg-gray-800 p-6 rounded-xl shadow space-y-2">
        <h3 className="text-xl font-bold">🧠 Professional Quant View</h3>
        <p className="text-gray-300 whitespace-pre-line">{data.pro_view}</p>
      </div>

      {/* Strike Selection */}
      <div className="bg-gray-900 p-6 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-bold">📌 Strike Selection</h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-2">Type</th>
              <th className="p-2">Strike</th>
              <th className="p-2">Delta</th>
              <th className="p-2">Gamma</th>
              <th className="p-2">Theta</th>
              <th className="p-2">Vega</th>
            </tr>
          </thead>

          <tbody>
            {data.strikes?.map((leg, idx) => (
              <tr key={idx} className="text-center border-b border-gray-800">
                <td className="p-2">{leg.type}</td>
                <td className="p-2">{leg.strike}</td>
                <td className="p-2">{leg.delta}</td>
                <td className="p-2">{leg.gamma}</td>
                <td className="p-2">{leg.theta}</td>
                <td className="p-2">{leg.vega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Market Context */}
      <div className="bg-gray-800 p-6 rounded-xl space-y-3">
        <h3 className="text-xl font-bold">📊 Market Context</h3>
        <p className="text-gray-300 whitespace-pre-line">{data.market_context}</p>
      </div>

    </div>
  );
}

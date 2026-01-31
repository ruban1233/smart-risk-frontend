import React, { useState } from "react";
import StrategyLeg from "../components/strategy/StrategyLeg";
import StrategySummary from "../components/strategy/StrategySummary";
import PayoffChart from "../components/strategy/PayoffChart";

export default function StrategyBuilder() {
  const [legs, setLegs] = useState([]);
  const [summary, setSummary] = useState({
    maxProfit: 0,
    maxLoss: 0,
    breakevens: "—",
  });

  const [chart, setChart] = useState({ x: [], y: [] });

  /** ADD LEG */
  const addLeg = () => {
    setLegs([...legs, { type: "BUY", optionType: "CE", strike: "", premium: "", qty: 1 }]);
  };

  /** UPDATE LEG */
  const updateLeg = (index, key, value) => {
    const updated = [...legs];
    updated[index][key] = value;
    setLegs(updated);
  };

  /** REMOVE LEG */
  const removeLeg = (index) => {
    const updated = legs.filter((_, i) => i !== index);
    setLegs(updated);
  };

  /** CALCULATE STRATEGY — dummy for now */
  const calculate = () => {
    setSummary({
      maxProfit: 12500,
      maxLoss: -8500,
      breakevens: "19250 / 19900",
    });

    setChart({
      x: [19000, 19200, 19400, 19600, 19800, 20000],
      y: [-5000, -2000, 2000, 8000, 12500, 9000],
    });
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold text-[#1d3557]">
        Options Strategy Builder
      </h1>

      {/* ADD LEG BUTTON */}
      <button
        className="bg-[#1d3557] text-white px-4 py-2 rounded-lg"
        onClick={addLeg}
      >
        + Add Leg
      </button>

      {/* STRATEGY LEGS */}
      <div className="space-y-4">
        {legs.map((leg, index) => (
          <StrategyLeg
            key={index}
            leg={leg}
            index={index}
            updateLeg={updateLeg}
            removeLeg={removeLeg}
          />
        ))}
      </div>

      {/* CALCULATE BUTTON */}
      {legs.length > 0 && (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={calculate}
        >
          Calculate Strategy
        </button>
      )}

      {/* SUMMARY + PAYOFF */}
      <StrategySummary summary={summary} />
      <PayoffChart chart={chart} />

    </div>
  );
}

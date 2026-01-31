import React from "react";

export default function StrategyLeg({ leg, index, updateLeg, removeLeg }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">

      {/* BUY / SELL */}
      <select
        className="border p-2 rounded-lg text-sm"
        value={leg.type}
        onChange={(e) => updateLeg(index, "type", e.target.value)}
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>

      {/* CE / PE */}
      <select
        className="border p-2 rounded-lg text-sm"
        value={leg.optionType}
        onChange={(e) => updateLeg(index, "optionType", e.target.value)}
      >
        <option value="CE">CALL (CE)</option>
        <option value="PE">PUT (PE)</option>
      </select>

      {/* STRIKE */}
      <input
        type="number"
        placeholder="Strike"
        className="border p-2 rounded-lg w-28 text-sm"
        value={leg.strike}
        onChange={(e) => updateLeg(index, "strike", e.target.value)}
      />

      {/* PREMIUM */}
      <input
        type="number"
        placeholder="Premium"
        className="border p-2 rounded-lg w-28 text-sm"
        value={leg.premium}
        onChange={(e) => updateLeg(index, "premium", e.target.value)}
      />

      {/* QTY */}
      <input
        type="number"
        placeholder="Qty"
        className="border p-2 rounded-lg w-20 text-sm"
        value={leg.qty}
        onChange={(e) => updateLeg(index, "qty", e.target.value)}
      />

      {/* DELETE BUTTON */}
      <button
        className="text-red-500 font-bold text-lg"
        onClick={() => removeLeg(index)}
      >
        ✖
      </button>
    </div>
  );
}

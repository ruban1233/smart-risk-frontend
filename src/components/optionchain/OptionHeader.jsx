import React from "react";

export default function OptionHeader({ expiryList, selectedExpiry, setSelectedExpiry }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      
      {/* Expiry Dropdown */}
      <div>
        <label className="text-gray-600 text-sm">Expiry</label>
        <select
          className="ml-3 border border-gray-300 rounded-lg p-2 text-sm"
          value={selectedExpiry}
          onChange={(e) => setSelectedExpiry(e.target.value)}
        >
          {expiryList.map((exp) => (
            <option key={exp} value={exp}>{exp}</option>
          ))}
        </select>
      </div>

      {/* Advanced Toggle */}
      <button
        className="px-4 py-2 bg-[#1d3557] text-white rounded-lg hover:bg-[#16324f]"
        onClick={() => window.dispatchEvent(new Event("toggleAdvanced"))}
      >
        Toggle Advanced View
      </button>

    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function AdvancedGreeks({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible((v) => !v);
    window.addEventListener("toggleAdvanced", toggle);
    return () => window.removeEventListener("toggleAdvanced", toggle);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-4 text-[#1d3557]">
        Advanced Greeks (Delta / Theta / Vega / Gamma)
      </h3>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-left">Strike</th>
            <th className="p-2 text-left">CE Delta</th>
            <th className="p-2 text-left">CE Theta</th>
            <th className="p-2 text-left">CE Vega</th>
            <th className="p-2 text-left">PE Delta</th>
            <th className="p-2 text-left">PE Theta</th>
            <th className="p-2 text-left">PE Vega</th>
          </tr>
        </thead>

        <tbody>
          {data.map((g, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{g.strike}</td>
              <td className="p-2">{g.ce_delta}</td>
              <td className="p-2">{g.ce_theta}</td>
              <td className="p-2">{g.ce_vega}</td>
              <td className="p-2">{g.pe_delta}</td>
              <td className="p-2">{g.pe_theta}</td>
              <td className="p-2">{g.pe_vega}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

import React from "react";

export default function OptionTable({ data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 shadow-sm overflow-x-auto">

      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left text-gray-600">CE OI</th>
            <th className="p-3 text-left text-gray-600">CE IV</th>
            <th className="p-3 text-left text-gray-600">CE LTP</th>
            <th className="p-3 text-left text-gray-600">STRIKE</th>
            <th className="p-3 text-left text-gray-600">PE LTP</th>
            <th className="p-3 text-left text-gray-600">PE IV</th>
            <th className="p-3 text-left text-gray-600">PE OI</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">

              <td className="p-3">{row.CE_OI}</td>
              <td className="p-3">{row.CE_IV}%</td>
              <td className="p-3 text-blue-600">{row.CE_LTP}</td>

              <td className="p-3 font-semibold">{row.STRIKE}</td>

              <td className="p-3 text-blue-600">{row.PE_LTP}</td>
              <td className="p-3">{row.PE_IV}%</td>
              <td className="p-3">{row.PE_OI}</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

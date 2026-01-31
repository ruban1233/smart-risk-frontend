import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function OptionChain() {
  const [chain, setChain] = useState([]);
  const [symbol, setSymbol] = useState("NIFTY");

  // Fetch option chain
  const fetchChain = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/option-chain/${symbol}/`
      );
      setChain(res.data.option_chain || []);
    } catch (err) {
      console.log("Error fetching option chain", err);
    }
  }, [symbol]);

  useEffect(() => {
    fetchChain();
  }, [fetchChain]);

  // ATM Strike – midpoint strike
  const getATMStrike = () => {
    if (chain.length === 0) return null;
    const strikes = chain.map((row) => row.strike);
    return strikes[Math.floor(strikes.length / 2)];
  };

  const atm = getATMStrike();
  const spot = atm; // using ATM as spot approximation

  // OI bar width calculation
  const maxOI = Math.max(
    ...chain.map((r) => r.CE?.openInterest || 0),
    ...chain.map((r) => r.PE?.openInterest || 0)
  );

  const getOIWidth = (oi) => {
    if (!maxOI) return 0;
    return (oi / maxOI) * 100;
  };

  // ITM detection
  const isCEITM = (strike) => strike < spot;
  const isPEITM = (strike) => strike > spot;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">📘 Option Chain</h1>

      {/* Symbol Selector */}
      <div className="mb-4">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-gray-800 p-3 rounded-lg"
        >
          <option value="NIFTY">NIFTY</option>
          <option value="BANKNIFTY">BANKNIFTY</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-700">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-2">CE OI</th>
              <th className="p-2">CE LTP</th>
              <th className="p-2">Delta</th>
              <th className="p-2">Gamma</th>
              <th className="p-2">Theta</th>
              <th className="p-2">Vega</th>
              <th className="p-2 bg-black">STRIKE</th>
              <th className="p-2">PE OI</th>
              <th className="p-2">PE LTP</th>
              <th className="p-2">Delta</th>
              <th className="p-2">Gamma</th>
              <th className="p-2">Theta</th>
              <th className="p-2">Vega</th>
            </tr>
          </thead>

          <tbody>
            {chain.map((row, index) => (
              <tr
                key={index}
                className={`text-center border-b border-gray-800 hover:bg-gray-700 transition ${
                  row.strike === atm ? "bg-gray-900" : ""
                }`}
              >
                {/* CE OI with bar */}
                <td className="relative p-2">
                  <div
                    className="absolute left-0 top-0 h-full bg-green-900 opacity-40"
                    style={{ width: `${getOIWidth(row.CE?.openInterest || 0)}%` }}
                  ></div>
                  <span className="relative z-10">
                    {row.CE?.openInterest || 0}
                  </span>
                </td>

                {/* CE LTP with ITM highlight */}
                <td
                  className={`p-2 ${
                    isCEITM(row.strike) ? "bg-green-800 text-black" : ""
                  }`}
                >
                  {row.CE?.lastPrice || "-"}
                </td>

                <td className="p-2">{row.CE_GREEKS?.delta || "-"}</td>
                <td className="p-2">{row.CE_GREEKS?.gamma || "-"}</td>
                <td className="p-2">{row.CE_GREEKS?.theta || "-"}</td>
                <td className="p-2">{row.CE_GREEKS?.vega || "-"}</td>

                {/* STRIKE */}
                <td className="p-2 font-bold bg-black">{row.strike}</td>

                {/* PE OI with bar */}
                <td className="relative p-2">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-900 opacity-40"
                    style={{ width: `${getOIWidth(row.PE?.openInterest || 0)}%` }}
                  ></div>
                  <span className="relative z-10">
                    {row.PE?.openInterest || 0}
                  </span>
                </td>

                {/* PE LTP with ITM highlight */}
                <td
                  className={`p-2 ${
                    isPEITM(row.strike) ? "bg-blue-800 text-black" : ""
                  }`}
                >
                  {row.PE?.lastPrice || "-"}
                </td>

                <td className="p-2">{row.PE_GREEKS?.delta || "-"}</td>
                <td className="p-2">{row.PE_GREEKS?.gamma || "-"}</td>
                <td className="p-2">{row.PE_GREEKS?.theta || "-"}</td>
                <td className="p-2">{row.PE_GREEKS?.vega || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

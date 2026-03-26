import { useEffect, useState, useCallback } from "react";
import "../styles/pages/Dashboard.css";

import { fetchSmartRisk } from "../services/api";
import RiskSignal from "../components/dashboard/RiskSignal";
import StrategyCard from "../components/dashboard/StrategyCard";

export default function Dashboard() {

  const [capital, setCapital] = useState(10000);
  const [symbol, setSymbol] = useState("NIFTY");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadRisk = useCallback(async () => {

    setLoading(true);

    try {
      const res = await fetchSmartRisk(symbol, capital,expiry);
      setData(res);
    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    }

    setLoading(false);

  }, [symbol, capital]);

  useEffect(() => {
    loadRisk();
  }, [loadRisk]);

  return (
    <div className="dashboard">

      <h2>Risk Dashboard</h2>

      {/* INPUTS */}
      <div style={{ marginBottom: "15px" }}>

        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(Number(e.target.value))}
          placeholder="Capital ₹"
        />

        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="NIFTY">NIFTY</option>
          <option value="BANKNIFTY">BANKNIFTY</option>
          <option value="SENSEX">SENSEX</option>
        </select>

        <button onClick={loadRisk}>
          Check Risk
        </button>

      </div>

      {loading && <p>Loading...</p>}

      {/* OUTPUT */}

      {data && (

        <>

          {/* PASS FULL RISK OBJECT */}
          <RiskSignal risk={data?.risk} />

          {/* STRATEGY */}
          {data?.option_advisory ? (

            <StrategyCard
              strategy={data.option_advisory.strategy}
            />

          ) : (

            <div style={{ marginTop: "15px" }}>
              <p>No strategy suggested due to high risk.</p>
            </div>

          )}

        </>

      )}

    </div>
  );
}
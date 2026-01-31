import { useState } from "react";
import axios from "axios";

/**
 * OPTION TRADING – SMART RISK
 * Financial Doctor Style UI
 */

function OptionTrading() {
  const [capital, setCapital] = useState(50000);
  const [symbol, setSymbol] = useState("NIFTY");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeMarket = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/smartrisk/?symbol=${symbol}&capital=${capital}`
      );
      setResult(res.data);
    } catch (err) {
      setError("Unable to analyze market. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Option Trading – Smart Risk</h1>

      {/* ================= INPUT PANEL ================= */}
      <div style={styles.inputPanel}>
        <div>
          <label>Capital (₹)</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            style={styles.input}
          />
        </div>

        <div>
          <label>Index</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            style={styles.input}
          >
            <option value="NIFTY">NIFTY</option>
            <option value="BANKNIFTY">BANKNIFTY</option>
          </select>
        </div>

        <button onClick={analyzeMarket} style={styles.button}>
          Analyze Market
        </button>
      </div>

      {loading && <p>Analyzing market conditions…</p>}
      {error && <p style={{ color: "#e74c3c" }}>{error}</p>}

      {/* ================= OUTPUT ================= */}
      {result && (
        <>
          {/* 🧠 MARKET DIAGNOSIS */}
          <Section title="🧠 Market Diagnosis">
            <Info label="Trend" value={result.sentiment.trend} />
            <Info label="Volatility" value={result.volatility.level} />
            <Info
              label="Risk Signal"
              value={result.traffic_light.risk_color}
              highlight
            />
          </Section>

          {/* 💊 STRATEGY PRESCRIPTION */}
          <Section title="💊 Strategy Prescription">
            <p><b>Strategy:</b> {result.strategy.strategy}</p>
            <p>{result.strategy.reason}</p>
            <p>
              <b>Max Capital at Risk:</b> ₹{result.strategy.max_risk}
            </p>
          </Section>

          {/* 🎯 EXECUTION PLAN */}
          <Section title="🎯 Execution Plan">
            <Info label="Expiry" value={result.strike_plan.expiry_type} />
            <Info label="Lot Size" value={result.strike_plan.lot_size} />
            <Info
              label="Lots Allowed"
              value={result.strike_plan.lots_allowed}
            />

            <pre style={styles.pre}>
              {JSON.stringify(result.strike_plan.strikes, null, 2)}
            </pre>
          </Section>

          {/* 💰 RISK & REWARD */}
          <Section title="💰 Risk & Reward Report">
            <StatCard
              label="Max Loss"
              value={`₹${result.pl_summary.max_loss}`}
              color="#e74c3c"
            />
            <StatCard
              label="Max Profit"
              value={`₹${result.pl_summary.max_profit}`}
              color="#2ecc71"
            />
            <StatCard
              label="Risk–Reward"
              value={result.pl_summary.risk_reward}
              color="#f1c40f"
            />

            <p style={styles.doctorAdvice}>
              Doctor Advice: {result.pl_summary.doctor_advice}
            </p>
          </Section>
        </>
      )}
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    {children}
  </div>
);

const Info = ({ label, value, highlight }) => (
  <p>
    <b>{label}:</b>{" "}
    <span style={{ color: highlight ? "#f1c40f" : "#ffffff" }}>
      {value}
    </span>
  </p>
);

const StatCard = ({ label, value, color }) => (
  <div style={{ ...styles.statCard, borderColor: color }}>
    <p style={{ opacity: 0.7 }}>{label}</p>
    <h3 style={{ color }}>{value}</h3>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0f1a",
    color: "#ffffff",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
  },
  pageTitle: {
    marginBottom: "20px",
  },
  inputPanel: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
    marginBottom: "30px",
  },
  input: {
    width: "180px",
    padding: "8px",
    background: "#11162a",
    color: "#ffffff",
    border: "1px solid #2a2f45",
    borderRadius: "6px",
  },
  button: {
    padding: "10px 16px",
    background: "#4da3ff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  section: {
    background: "#11162a",
    border: "1px solid #2a2f45",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "25px",
  },
  sectionTitle: {
    marginBottom: "12px",
  },
  statCard: {
    display: "inline-block",
    marginRight: "15px",
    padding: "15px",
    border: "2px solid",
    borderRadius: "8px",
    minWidth: "150px",
  },
  pre: {
    background: "#0b0f1a",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "10px",
    fontSize: "13px",
  },
  doctorAdvice: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "#4da3ff",
  },
};

export default OptionTrading;

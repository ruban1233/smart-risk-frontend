import React, { useState } from "react";
import { fetchInvestmentPlanner } from "../services/api";
import TrafficLight from "../components/dashboard/TrafficLight";
import AssetCard from "../components/dashboard/AssetCard";
import AllocationPieChart from "../components/charts/AllocationPieChart";

function InvestmentPlanner() {
  const [capital, setCapital] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // CAPITAL → CATEGORY (UI ONLY)
  // ===============================
  const getInvestorCategoryUI = (amount) => {
    if (amount < 10000) {
      return {
        level: "⚠ ALERT",
        color: "orange",
        message:
          "Capital below ₹10,000 is not suitable for investing or diversification.",
      };
    } else if (amount < 300000) {
      return {
        level: "🟢 BEGINNER",
        color: "green",
        message: "Learning & safe phase. Prefer SIP and mutual funds.",
      };
    } else if (amount < 1500000) {
      return {
        level: "🟡 PROFESSIONAL",
        color: "goldenrod",
        message: "Real diversification possible across funds and ETFs.",
      };
    } else {
      return {
        level: "🔴 EXPERT",
        color: "red",
        message: "Advanced investing & portfolio strategies possible.",
      };
    }
  };

  // ===============================
  // DIVERSIFICATION % (DISPLAY ONLY)
  // ===============================
  const getAllocationPercentages = (category) => {
    if (category === "BEGINNER") {
      return [
        { label: "Equity (Index MF)", value: 70 },
        { label: "Debt MF", value: 20 },
        { label: "Gold MF", value: 10 },
      ];
    }

    if (category === "PROFESSIONAL") {
      return [
        { label: "Equity (MF / ETF)", value: 50 },
        { label: "Debt", value: 25 },
        { label: "Gold", value: 15 },
        { label: "Stocks", value: 10 },
      ];
    }

    return [
      { label: "Core Equity", value: 40 },
      { label: "Stocks", value: 30 },
      { label: "Debt", value: 15 },
      { label: "Gold", value: 10 },
      { label: "Cash Buffer", value: 5 },
    ];
  };

  // ===============================
  // GENERATE PLAN
  // ===============================
  const generatePlan = async () => {
    if (!capital) {
      setError("Please enter capital amount");
      return;
    }

    if (Number(capital) < 10000) {
      setPlan(null);
      setError("Capital below ₹10,000 is not suitable for investing.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const data = await fetchInvestmentPlanner(capital);
      setPlan(data.investment_plan);
    } catch (err) {
      setError("Failed to fetch investment plan");
    } finally {
      setLoading(false);
    }
  };

  const capitalInfo = capital ? getInvestorCategoryUI(Number(capital)) : null;
  const disableButton = Number(capital) < 10000;

  return (
    <div style={{ padding: "20px", maxWidth: "900px" }}>
      <h2>SMART RISK MANAGEMENT AND INVESTMENT PLANNER</h2>

      {/* CAPITAL INPUT */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="Enter Capital (₹)"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button
          onClick={generatePlan}
          disabled={disableButton}
          style={{
            marginLeft: "10px",
            padding: "10px",
            backgroundColor: disableButton ? "#ccc" : "#1e40af",
            color: "white",
            border: "none",
            cursor: disableButton ? "not-allowed" : "pointer",
          }}
        >
          Generate Plan
        </button>
      </div>

      {/* CAPITAL CATEGORY TABLE */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          backgroundColor: "#f9fafb",
          marginBottom: "20px",
        }}
      >
        <h4>Investor Category Based on Capital</h4>
        <table width="100%" style={{ marginTop: "10px" }}>
          <tbody>
            <tr>
              <td>&lt; ₹10,000</td>
              <td>⚠ Alert</td>
              <td>Not investable</td>
            </tr>
            <tr>
              <td>₹10,000 – ₹3,00,000</td>
              <td>🟢 Beginner</td>
              <td>Learning & safe phase</td>
            </tr>
            <tr>
              <td>₹3,00,000 – ₹15,00,000</td>
              <td>🟡 Professional</td>
              <td>Real diversification</td>
            </tr>
            <tr>
              <td>₹15,00,000+</td>
              <td>🔴 Expert</td>
              <td>Advanced investing</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* USER CATEGORY */}
      {capitalInfo && (
        <div
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderLeft: `6px solid ${capitalInfo.color}`,
            backgroundColor: "#fff",
          }}
        >
          <strong>Your Investor Category:</strong> {capitalInfo.level}
          <br />
          <span>{capitalInfo.message}</span>
        </div>
      )}

      {loading && <p>Loading investment plan...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* RESULT */}
      {plan && (
        <>
          <h3>Market Risk Signal</h3>
          <TrafficLight signal={plan.traffic_light} />

          <p>
            <strong>Diversification:</strong>{" "}
            {plan.diversification_status}
          </p>

          <h4>Investment Priority</h4>
          <ol>
            {plan.investment_priority.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>

          {/* ✅ PIE CHART ADDED HERE */}
          <h4>Suggested Diversification (%)</h4>
          <AllocationPieChart
            data={getAllocationPercentages(plan.investor_category)}
          />

          {/* PERCENTAGE CARDS */}
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {getAllocationPercentages(plan.investor_category).map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "12px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    minWidth: "160px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <strong>{item.label}</strong>
                  <p style={{ fontSize: "20px", marginTop: "5px" }}>
                    {item.value}%
                  </p>
                </div>
              )
            )}
          </div>

          <h4>Affordable Assets (Executable)</h4>
          {plan.affordable_assets.map((asset, index) => (
            <AssetCard key={index} asset={asset} />
          ))}

          {plan.blocked_assets.length > 0 && (
            <>
              <h4>Blocked Assets (Not Executable)</h4>
              {plan.blocked_assets.map((asset, index) => (
                <AssetCard key={index} asset={asset} type="blocked" />
              ))}
            </>
          )}

          <p>
            <strong>Education:</strong> {plan.education}
          </p>
          <p>
            <strong>Next Step:</strong> {plan.next_step}
          </p>
        </>
      )}
    </div>
  );
}

export default InvestmentPlanner;

import React, { useState } from "react";
import { fetchInvestmentPlanner } from "../services/api";

import AssetCard from "../components/dashboard/AssetCard";
import AllocationCard from "../components/dashboard/AllocationCard";
import AllocationPieChart from "../components/charts/AllocationPieChart";

function InvestmentPlanner() {

  const [capital, setCapital] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // INVESTOR CATEGORY
  // ===============================

  const getInvestorCategoryUI = (amount) => {
    if (amount < 10000) {
      return {
        level: "⚠ ALERT",
        color: "orange",
        message: "Capital below ₹10,000 is not suitable for investing."
      };
    }

    if (amount < 300000) {
      return {
        level: "🟢 BEGINNER",
        color: "green",
        message: "Learning phase. Prefer SIP, mutual funds and ETFs."
      };
    }

    if (amount < 1500000) {
      return {
        level: "🟡 PROFESSIONAL",
        color: "goldenrod",
        message: "Diversified portfolio across stocks, ETFs and funds."
      };
    }

    return {
      level: "🔴 EXPERT",
      color: "red",
      message: "Advanced investing and portfolio strategies possible."
    };
  };

  const generatePlan = async () => {

    if (!capital) {
      setError("Please enter capital amount");
      return;
    }

    if (Number(capital) < 10000) {
      setError("Capital below ₹10,000 not suitable for investing.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan(null);

    try {

      const data = await fetchInvestmentPlanner(capital);

      console.log("FINAL DATA RECEIVED:", JSON.stringify(data, null, 2));

      // ✅ Extract plan — api.js already normalizes it
      const planData = data?.investment_plan;

      // ✅ Check if plan is valid and has at least one key
      if (
        !planData ||
        typeof planData !== "object" ||
        Object.keys(planData).length === 0
      ) {
        console.error("Empty plan data:", planData);
        setError("No investment plan returned. Please check your backend.");
        return;
      }

      setPlan(planData);

    } catch (err) {

      console.error("generatePlan Error:", err);
      setError("Server busy, please try again.");

    } finally {

      setLoading(false);

    }
  };

  const capitalInfo = capital ? getInvestorCategoryUI(Number(capital)) : null;
  const disableButton = !capital || Number(capital) < 10000;

  return (

    <div style={{ padding: "20px", maxWidth: "1100px" }}>

      <h2>SMART RISK MANAGEMENT AND INVESTMENT PLANNER</h2>

      {/* ===============================
          CAPITAL INPUT
      =============================== */}

      <div style={{ marginBottom: "20px" }}>

        <input
          type="number"
          placeholder="Enter Capital (₹)"
          value={capital}
          onChange={(e) => {
            setCapital(e.target.value);
            setError("");
            setPlan(null);
          }}
          style={{
            padding: "10px",
            width: "250px"
          }}
        />

        <button
          onClick={generatePlan}
          disabled={disableButton}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: disableButton ? "#ccc" : "#1e40af",
            color: "white",
            border: "none",
            cursor: disableButton ? "not-allowed" : "pointer",
          }}
        >
          Generate Plan
        </button>

      </div>

      {/* ===============================
          INVESTOR CATEGORY TABLE
      =============================== */}

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

        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>&lt; ₹10,000</td>
              <td>⚠ Alert</td>
              <td>Not investable</td>
            </tr>
            <tr>
              <td>₹10,000 – ₹3,00,000</td>
              <td>🟢 Beginner</td>
              <td>Learning phase</td>
            </tr>
            <tr>
              <td>₹3,00,000 – ₹15,00,000</td>
              <td>🟡 Professional</td>
              <td>Diversified investing</td>
            </tr>
            <tr>
              <td>₹15,00,000+</td>
              <td>🔴 Expert</td>
              <td>Advanced portfolio strategies</td>
            </tr>
          </tbody>
        </table>

      </div>

      {/* ===============================
          USER CATEGORY MESSAGE
      =============================== */}

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

      {loading && <p>⏳ Generating investment plan, please wait...</p>}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠ {error}
        </p>
      )}

      {/* ===============================
          RESULT
      =============================== */}

      {plan && (

        <>

          {/* PIE CHART */}
          {plan?.asset_allocation && (
            <AllocationPieChart allocation={plan.asset_allocation} />
          )}

          {/* ALLOCATION CARD */}
          {plan?.asset_allocation && (
            <AllocationCard
              allocation={plan.asset_allocation}
              cashReserve={plan.cash_reserve}
            />
          )}

          {/* AI EXPLANATION */}
          {plan?.ai_summary && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                backgroundColor: "#f3f4f6"
              }}
            >
              <h3>AI Financial Doctor Explanation</h3>
              <p style={{ whiteSpace: "pre-line" }}>
                {plan.ai_summary}
              </p>
            </div>
          )}

          {/* PORTFOLIO */}
          {plan?.portfolio?.length > 0 && (
            <>
              <h3 style={{ marginTop: "25px" }}>Investment Portfolio</h3>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap"
                }}
              >
                {plan.portfolio.map((asset, index) => (
                  <AssetCard key={index} asset={asset} />
                ))}
              </div>
            </>
          )}

          {/* BLOCKED ASSETS */}
          {plan?.blocked_assets?.length > 0 && (
            <>
              <h4 style={{ marginTop: "20px" }}>Blocked Assets</h4>
              {plan.blocked_assets.map((asset, index) => (
                <AssetCard
                  key={index}
                  asset={asset}
                  type="blocked"
                />
              ))}
            </>
          )}

          {/* TOTALS */}
          {plan?.total_invested !== undefined && (
            <p style={{ marginTop: "20px" }}>
              <strong>Total Invested:</strong> ₹{plan.total_invested.toFixed(2)}
            </p>
          )}

          {plan?.final_remaining_cash !== undefined && (
            <p>
              <strong>Remaining Cash:</strong> ₹{plan.final_remaining_cash.toFixed(2)}
            </p>
          )}

        </>

      )}

    </div>
  );
}

export default InvestmentPlanner;
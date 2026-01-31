import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1>SMART RISK MANAGEMENT AND INVESTMENT PLANNER</h1>
      <p>Smart Investment & Risk Advisor</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/investment")}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Get My Investment Plan
        </button>
      </div>
    </div>
  );
};

export default Home;

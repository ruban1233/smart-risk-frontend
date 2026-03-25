import React from "react";

function AllocationCard({ allocation, cashReserve }) {

  if (!allocation) return null;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px",
        backgroundColor: "#f9fafb",
      }}
    >

      <h3>Capital Allocation</h3>

      <ul>

        <li>Stocks: {allocation.stocks}%</li>

        <li>ETF: {allocation.etf}%</li>

        <li>Mutual Funds: {allocation.mutual_funds}%</li>

        <li>Gold: {allocation.gold}%</li>

        <li>Cash: {allocation.cash}%</li>

      </ul>

      <p>
        <b>Cash Reserve:</b> ₹{cashReserve}
      </p>

      <p style={{ fontSize: "13px", color: "#6b7280" }}>
        This allocation balances growth, diversification, and risk control.
      </p>

    </div>
  );
}

export default AllocationCard;
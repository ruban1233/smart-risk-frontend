import React from "react";

function AssetCard({ asset, type = "affordable" }) {
  const isBlocked = type === "blocked";

  return (
    <div
      style={{
        border: `2px solid ${isBlocked ? "#dc2626" : "#16a34a"}`,
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ marginBottom: "8px" }}>
        {asset.name}{" "}
        <span style={{ fontSize: "14px", color: "#555" }}>
          ({asset.type})
        </span>
      </h4>

      {asset.price && (
        <p>
          <strong>Price:</strong> ₹{asset.price}
        </p>
      )}

      {!isBlocked && asset.units !== undefined && (
        <>
          <p>
            <strong>Units you can buy:</strong> {asset.units}
          </p>
          <p>
            <strong>Total cost:</strong> ₹{asset.total_cost}
          </p>
          <p>
            <strong>Remaining cash:</strong> ₹{asset.remaining_cash}
          </p>
        </>
      )}

      <p
        style={{
          marginTop: "10px",
          color: isBlocked ? "#dc2626" : "#16a34a",
          fontWeight: "bold",
        }}
      >
        {isBlocked ? "❌ Not Executable" : "✅ Executable"}
      </p>

      <small style={{ color: "#555" }}>{asset.reason}</small>
    </div>
  );
}

export default AssetCard;

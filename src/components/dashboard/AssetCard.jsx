import React from "react";

function AssetCard({ asset, type }) {

  if (!asset) return null;

  const isBlocked = type === "blocked";

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "12px",
        width: "220px",
        backgroundColor: isBlocked ? "#fff5f5" : "#f9fafb",
      }}
    >

      <h4>{asset.asset}</h4>

      {!isBlocked ? (

        <>

          <p>Price: ₹{asset.price?.toFixed(2)}</p>

          <p>Units you can buy: {asset.units}</p>

          <p>Total cost: ₹{asset.invested?.toFixed(2)}</p>

          <p>Remaining cash: ₹{asset.remaining_from_allocation?.toFixed(2)}</p>

          <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Executable
          </p>

        </>

      ) : (

        <>

          <p style={{ color: "red", fontWeight: "bold" }}>
            ❌ Not Executable
          </p>

          <p>{asset.reason}</p>

        </>

      )}

    </div>
  );
}

export default AssetCard;
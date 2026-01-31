const VolatilityCard = ({ level }) => {
  const color =
    level === "LOW" ? "#16a34a" : level === "MEDIUM" ? "#ca8a04" : "#dc2626";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <h3>Volatility</h3>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color,
          marginTop: "8px",
        }}
      >
        {level}
      </div>

      <p style={{ fontSize: "13px", marginTop: "8px", color: "#555" }}>
        Higher volatility increases option risk.
      </p>
    </div>
  );
};

export default VolatilityCard;

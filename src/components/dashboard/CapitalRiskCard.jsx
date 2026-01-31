const CapitalRiskCard = ({ maxLossPercent, maxLossAmount }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <h3>Capital Risk Allowed</h3>

      <div style={{ marginTop: "12px" }}>
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>
          ₹{maxLossAmount}
        </div>

        <div style={{ fontSize: "14px", color: "#555" }}>
          Maximum loss ({maxLossPercent}% of capital)
        </div>
      </div>

      <p style={{ fontSize: "13px", marginTop: "10px", color: "#777" }}>
        This limit prevents account wipeout and enforces discipline.
      </p>
    </div>
  );
};

export default CapitalRiskCard;

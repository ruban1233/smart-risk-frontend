export default function RiskSignal({ risk }) {

  if (!risk) {
    return <p>No risk data</p>;
  }

  return (
    <div
      style={{
        background: risk.risk_color || "gray",
        padding: "10px",
        color: "white",
        marginTop: "10px"
      }}
    >
      <h3>Risk Signal: {risk.signal}</h3>

      {risk.reasons?.map((r, i) => (
        <p key={i}>{r}</p>
      ))}
    </div>
  );
}
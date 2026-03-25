import "./StrategyCard.css";

export default function StrategyCard({ strategy }) {
  if (!strategy) return null;

  return (
    <div className="strategy-card">
      <h3>Suggested Strategy</h3>

      <p><b>Name:</b> {strategy.name}</p>
      <p><b>Strike:</b> {strategy.strike_price}</p>
      <p><b>Expiry:</b> {strategy.expiry}</p>
      <p><b>Premium:</b> ₹{strategy.premium}</p>
      <p><b>Lot Size:</b> {strategy.lot_size}</p>
      <p><b>Capital Required:</b> ₹{strategy.capital_required}</p>
      <p><b>Max Loss:</b> ₹{strategy.max_loss}</p>
      <p><b>Break Even:</b> {strategy.break_even}</p>
    </div>
  );
}

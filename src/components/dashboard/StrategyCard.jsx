export default function StrategyCard() {
  return (
    <div className="card">
      <h3>Suggested Strategy</h3>
      <h4>Iron Condor</h4>
      <ul>
        <li>✔ Sideways market</li>
        <li>✔ Low volatility</li>
        <li>✔ Defined risk</li>
      </ul>

      <div className="summary">
        <b>Backtest (5Y):</b>  
        Avg Return: 11.8% | Max Drawdown: -7%
      </div>
    </div>
  );
}

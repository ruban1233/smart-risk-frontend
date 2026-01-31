import "./StrategyPanel.css";

export default function StrategyPanel() {
  return (
    <div className="strategy-panel">
      <h3>Suggested Strategy</h3>

      <div className="strategy-card">
        <h4>Iron Condor</h4>
        <p>Best for sideways markets with controlled risk</p>

        <ul>
          <li>✔ Max Loss: ₹5,000</li>
          <li>✔ Expected Return: 8–12%</li>
          <li>✔ Backtested: 5 Years</li>
        </ul>
      </div>
    </div>
  );
}

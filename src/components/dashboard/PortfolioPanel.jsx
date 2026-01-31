import "./PortfolioPanel.css";

export default function PortfolioPanel() {
  return (
    <div className="portfolio-panel">
      <h3>Your Personalized Portfolio Report</h3>

      <div className="allocation">
        <p>Equities <span>35%</span></p>
        <p>ETFs <span>25%</span></p>
        <p>Options <span>30%</span></p>
        <p>Cash <span>10%</span></p>
      </div>

      <div className="summary">
        <div>
          <strong>+₹1,85,000</strong>
          <span>Profit</span>
        </div>
        <div>
          <strong>-12.5%</strong>
          <span>Max Drawdown</span>
        </div>
      </div>
    </div>
  );
}

export default function AllocationCard() {
  return (
    <div className="card">
      <h3>Capital Allocation</h3>

      <ul>
        <li>ETF: 50%</li>
        <li>Large Cap Stocks: 30%</li>
        <li>Gold ETF: 10%</li>
        <li>Cash: 10%</li>
      </ul>

      <p><b>Expected Return:</b> 10–12% annually</p>

      <p className="note">
        This allocation balances growth and safety.
      </p>
    </div>
  );
}

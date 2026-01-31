import "../styles/pages/Dashboard.css";
import RiskSignal from "../components/dashboard/RiskSignal";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Risk Dashboard</h2>
      <RiskSignal />
    </div>
  );
}

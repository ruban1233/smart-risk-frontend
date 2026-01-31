import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>🧠 AI FINANCIAL DOCTOR</h3>

      <Link to="/" className="active">Home</Link>
      <Link to="/recommendations">Recommendations</Link>
      <Link to="/option-trading">Options</Link>
      <Link to="/investment-planner">Investment</Link>
    </div>
  );
}
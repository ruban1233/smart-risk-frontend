import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">🧠 AI FINANCIAL DOCTOR</div>

      <nav>
        <Link to="/" className="active">Home</Link>
        <Link to="/recommendations">Recommendations</Link>
        <Link to="/options">Options</Link>
        <Link to="/greeks">Greeks</Link>
        <Link to="/trend">Trend</Link>
        <Link to="/portfolio">Portfolio</Link>
      </nav>
    </aside>
  );
}

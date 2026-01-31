import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>🧠 AI Financial Doctor</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Risk Dashboard</Link>
        <Link to="/investment">Investment Planner</Link>
      </div>
    </div>
  );
}

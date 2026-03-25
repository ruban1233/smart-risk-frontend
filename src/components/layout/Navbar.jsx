/**
 * Navbar.jsx
 * Path: D:\FRONTEND\SMARTFIN\SRC\components\layout\Navbar.jsx
 */

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🧠 AI Financial Doctor
      </div>
      <div className="navbar-links">
        <NavLink to="/"               className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/dashboard"      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Risk Dashboard</NavLink>
        <NavLink to="/investment"     className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Investment Planner</NavLink>
        <NavLink to="/option-trading" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Option Trading</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
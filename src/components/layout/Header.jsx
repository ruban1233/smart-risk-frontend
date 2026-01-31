import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <i className="fas fa-brain"></i>
          </div>
          <div className="logo-text">
            <h1 className="main-title">AI FINANCIAL DOCTOR</h1>
            <h2 className="sub-title">SMART RISK MANAGEMENT & INVESTMENT PLANNER</h2>
            <p className="powered-by">Powered by AI & NSE Data</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-primary">
            <i className="fas fa-user-circle"></i>
            <span>My Account</span>
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import './Recommendations.css';

const Recommendations = () => {
  const recommendations = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd.',
      price: '2,890.50',
      target: '3,200',
      change: '+2.5%',
      reason: 'Strong uptrend, low volatility',
      analysis: 'EMA-based trend analysis',
      risk: 'Low',
      sector: 'Energy'
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd.',
      price: '1,680.25',
      target: '1,850',
      change: '+1.8%',
      reason: 'Consolidation breakout expected',
      analysis: 'Volume spike with bullish pattern',
      risk: 'Medium',
      sector: 'Banking'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: '3,845.75',
      target: '4,100',
      change: '+1.2%',
      reason: 'Strong fundamentals, oversold',
      analysis: 'RSI divergence on daily chart',
      risk: 'Low',
      sector: 'IT'
    }
  ];

  return (
    <div className="recommendations">
      <div className="recommendations-header">
        <h3>
          <i className="fas fa-star"></i>
          Top Recommendations for You
        </h3>
        <button className="refresh-btn">
          <i className="fas fa-sync-alt"></i>
          Refresh
        </button>
      </div>
      
      <div className="recommendations-list">
        {recommendations.map((stock, index) => (
          <div key={index} className="recommendation-item">
            <div className="stock-header">
              <div className="stock-symbol">
                <div className="symbol">{stock.symbol}</div>
                <div className="name">{stock.name}</div>
              </div>
              <div className="stock-price">
                <div className="price">{stock.price}</div>
                <div className={`change ${stock.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stock.change}
                </div>
              </div>
            </div>
            
            <div className="stock-details">
              <div className="detail">
                <span className="label">Target:</span>
                <span className="value target">{stock.target}</span>
              </div>
              <div className="detail">
                <span className="label">Risk:</span>
                <span className={`value risk-${stock.risk.toLowerCase()}`}>
                  {stock.risk}
                </span>
              </div>
              <div className="detail">
                <span className="label">Sector:</span>
                <span className="value">{stock.sector}</span>
              </div>
            </div>
            
            <div className="stock-analysis">
              <p className="reason">{stock.reason}</p>
              <p className="analysis">
                <i className="fas fa-chart-line"></i>
                {stock.analysis}
              </p>
            </div>
            
            <div className="stock-actions">
              <button className="action-btn buy">
                <i className="fas fa-shopping-cart"></i>
                Buy
              </button>
              <button className="action-btn watch">
                <i className="far fa-eye"></i>
                Watch
              </button>
              <button className="action-btn details">
                <i className="fas fa-info-circle"></i>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
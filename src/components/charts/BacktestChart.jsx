import React from 'react';
import './BacktestChart.css';

const BacktestChart = () => {
  // Mock data for chart
  const dataPoints = [150, 180, 210, 240, 270, 300, 330, 300, 280, 260, 240, 220, 200];
  
  const maxValue = Math.max(...dataPoints);
  const minValue = Math.min(...dataPoints);
  
  return (
    <div className="backtest-chart">
      <div className="chart-header">
        <h4>Options Trading (Intraday NIFTY 50)</h4>
        <div className="chart-period">5-Year Performance</div>
      </div>
      
      <div className="chart-container">
        <div className="y-axis">
          <div className="y-label">300</div>
          <div className="y-label">250</div>
          <div className="y-label">200</div>
          <div className="y-label">150</div>
          <div className="y-label">100</div>
        </div>
        
        <div className="chart-area">
          <div className="chart-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid-line"></div>
            ))}
          </div>
          
          <div className="data-line">
            {dataPoints.map((value, index) => {
              const height = ((value - minValue) / (maxValue - minValue)) * 100;
              return (
                <div
                  key={index}
                  className="data-point"
                  style={{
                    height: `${height}%`,
                    left: `${(index / (dataPoints.length - 1)) * 100}%`
                  }}
                >
                  <div className="point-tooltip">{value}</div>
                </div>
              );
            })}
          </div>
          
          <div className="x-axis">
            {['2019', '2020', '2021', '2022', '2023', '2024'].map((label, i) => (
              <div key={i} className="x-label">{label}</div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color equity"></div>
          <span>Strategy Performance</span>
        </div>
        <div className="legend-item">
          <div className="legend-color benchmark"></div>
          <span>NIFTY 50 Benchmark</span>
        </div>
      </div>
    </div>
  );
};

export default BacktestChart;
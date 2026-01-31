import React from 'react';
import './Roadmap.css';

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: 1,
      title: 'Planning',
      tasks: ['Research & Planning', 'Market Analysis', 'Requirements Gathering'],
      status: 'completed',
      timeline: 'Q1 2024'
    },
    {
      phase: 2,
      title: 'Development',
      tasks: ['Frontend Development', 'Backend API', 'AI Model Integration'],
      status: 'in-progress',
      timeline: 'Q2 2024'
    },
    {
      phase: 3,
      title: 'Testing',
      tasks: ['Unit Testing', 'Integration Testing', 'User Acceptance Testing'],
      status: 'pending',
      timeline: 'Q3 2024'
    },
    {
      phase: 4,
      title: 'Rollout',
      tasks: ['Beta Launch', 'Production Deployment', 'Global Rollout (India Focus)'],
      status: 'pending',
      timeline: 'Q4 2024'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#2196f3';
      case 'pending': return '#ff9800';
      default: return '#aaaacc';
    }
  };

  return (
    <div className="roadmap">
      <div className="roadmap-header">
        <h3>
          <i className="fas fa-road"></i>
          Development Roadmap
        </h3>
        <div className="roadmap-subtitle">Project Timeline & Milestones</div>
      </div>
      
      <div className="roadmap-timeline">
        <div className="timeline-line"></div>
        
        <div className="roadmap-items">
          {roadmapItems.map((item, index) => (
            <div key={index} className="roadmap-item">
              <div className="phase-marker" style={{ borderColor: getStatusColor(item.status) }}>
                <div className="phase-number">{item.phase}</div>
                <div className="phase-status" style={{ background: getStatusColor(item.status) }}>
                  {item.status === 'completed' && <i className="fas fa-check"></i>}
                  {item.status === 'in-progress' && <i className="fas fa-sync-alt"></i>}
                  {item.status === 'pending' && <i className="fas fa-clock"></i>}
                </div>
              </div>
              
              <div className="phase-content">
                <div className="phase-header">
                  <h4 className="phase-title">Phase {item.phase}: {item.title}</h4>
                  <span className="phase-timeline">{item.timeline}</span>
                </div>
                
                <ul className="phase-tasks">
                  {item.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="task-item">
                      <i className="fas fa-chevron-right"></i>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="roadmap-legend">
        <div className="legend-item">
          <div className="legend-dot completed"></div>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot in-progress"></div>
          <span>In Progress</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot pending"></div>
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
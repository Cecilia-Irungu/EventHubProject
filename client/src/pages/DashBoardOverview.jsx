import React from 'react';
import './DashboardOverview.css';

const DashboardOverview = () => {
  return (
    <div className="overview-container">
      <h1 className="overview-title">Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p className="stat-value">12</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-value">34</p>
        </div>
        <div className="stat-card">
          <h3>Feedbacks</h3>
          <p className="stat-value">8</p>
        </div>
      </div>

      {}
    </div>
  );
};

export default DashboardOverview;
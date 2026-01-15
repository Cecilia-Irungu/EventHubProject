import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <header>Dashboard Header</header>
      <main>{children}</main>
      <footer>Dashboard Footer</footer>
    </div>
  );
};

export default DashboardLayout;

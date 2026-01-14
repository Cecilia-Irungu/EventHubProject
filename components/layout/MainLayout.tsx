import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* Main layout wrapper */}
      {children}
    </div>
  );
};

export default MainLayout;

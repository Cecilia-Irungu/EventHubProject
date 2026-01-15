import React from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Add authentication logic here
  return <>{children}</>;
};

export default ProtectedRoute;

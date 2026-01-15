const Navbar: React.FC = () => {
  return (
    <nav>
      {/* Navbar content */}
    </nav>
  );
};

export default Navbar;
=======
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../src/authStore';
import { Button } from '../ui/button/button';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              EventHub
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors">
                Events
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

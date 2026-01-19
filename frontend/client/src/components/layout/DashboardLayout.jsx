import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Assuming react-router-dom is used
import { 
  Menu, X, LayoutDashboard, Calendar, Ticket, User, Settings, LogOut 
} from 'lucide-react'; // Install: npm install lucide-react

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/events', label: 'My Events', icon: Calendar },
    { path: '/bookings', label: 'Bookings', icon: Ticket },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar - Mobile Menu Toggle */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                EventHub
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop right-side (e.g. user avatar/logout) */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                Eugene
              </Link>
              <button className="text-gray-700 hover:text-red-600 flex items-center gap-1">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop: fixed left | Mobile: overlay/full */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:shadow-none overflow-y-auto`}
        >
          <div className="p-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)} // Close on mobile click
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Logout at bottom */}
            <div className="mt-auto pt-6 border-t">
              <button className="flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
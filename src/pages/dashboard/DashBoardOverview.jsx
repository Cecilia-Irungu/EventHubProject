// src/pages/dashboard/DashboardOverview.jsx

const DashboardOverview = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here’s an overview of your events.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Events</p>
          <h2 className="text-xl font-semibold">0</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Tickets Sold</p>
          <h2 className="text-xl font-semibold">0</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Upcoming Events</p>
          <h2 className="text-xl font-semibold">0</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-xl font-semibold">KES 0</h2>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="bg-white p-4 rounded shadow text-gray-500">
          No upcoming events yet.
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <header>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Manage your events and track performance
          </p>
        </header>

        {/* Stats Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          {/* Stats cards will go here */}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          {/* Action buttons will go here */}
        </section>
      </div>
    </DashboardLayout>
  );
}

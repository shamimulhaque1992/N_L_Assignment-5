import { Suspense } from "react";

import { DashboardStatsSkeleton } from "../_components/DashboardStatsSkeleton";
import AdminDashboardStatComponent from "./_components/AdminDashboardStatComponent";

const AdminDashboardPage = async () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform-wide overview of users, properties, requests, and reviews.
        </p>
      </div>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <AdminDashboardStatComponent />
      </Suspense>
    </div>
  );
};

export default AdminDashboardPage;

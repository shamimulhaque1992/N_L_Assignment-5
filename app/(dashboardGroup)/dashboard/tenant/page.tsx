import { Suspense } from "react";
import TenantDashboardStatComponent from "./_components/TenantDashboardStatComponent";
import { DashboardStatsSkeleton } from "../_components/DashboardStatsSkeleton";

const TenantDashboardPage = async () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Tenant Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your rental requests, payments, and activity.
        </p>
      </div>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <TenantDashboardStatComponent />
      </Suspense>
    </div>
  );
};

export default TenantDashboardPage;

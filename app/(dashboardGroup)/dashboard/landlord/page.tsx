import { Suspense } from "react";
import LandLordDashboardStatComponent from "./_components/LandLordDashboardStatComponent";
import { DashboardStatsSkeleton } from "../_components/DashboardStatsSkeleton";

const LandLordDashboardPage = async () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Landlord Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your properties, requests, and earnings.
        </p>
      </div>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <LandLordDashboardStatComponent />
      </Suspense>
    </div>
  );
};

export default LandLordDashboardPage;

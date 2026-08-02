import { Suspense } from "react";
import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";
import AllPropertyRequestDashboardListing from "../_components/AllPropertyRequestDashboardLIsting";

const AllPropertyRequestDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">
          All rental requests for your properties are listed below.
        </p>
      </div>

      <Suspense fallback={<PropertyTableSkeleton />}>
        <AllPropertyRequestDashboardListing searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AllPropertyRequestDashboardPage;

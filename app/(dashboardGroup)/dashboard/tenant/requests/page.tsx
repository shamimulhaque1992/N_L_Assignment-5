import { Suspense } from "react";
import TenantRequestLIsting from "../_components/TenantRequestLIsting";
import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";

const AllMyRequestDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          My Rental Requests
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          All your submitted rental requests are listed below.
        </p>
      </div>

      <Suspense fallback={<PropertyTableSkeleton />}>
        <TenantRequestLIsting searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AllMyRequestDashboardPage;

import { Suspense } from "react";

import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";
import AdminPropertyListing from "../_components/AdminPropertyListing";

const AdminAllPropertiesDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between items-center w-full gap-y-4 gap-x-6">
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight">
            Rental Properties
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            All rental properties have listed are shown below.
          </p>
        </div>
      </div>
      <Suspense fallback={<PropertyTableSkeleton />}>
        <AdminPropertyListing searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AdminAllPropertiesDashboardPage;

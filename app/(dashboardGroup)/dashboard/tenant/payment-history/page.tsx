import { Suspense } from "react";

import TenantPaymentHistoryListing from "../_components/TenantPaymentHistoryListing";
import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";

const AllPaymentsDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View all of your completed and pending payment transactions.
        </p>
      </div>

      <Suspense fallback={<PropertyTableSkeleton />}>
        <TenantPaymentHistoryListing searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AllPaymentsDashboardPage;

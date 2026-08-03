import { Suspense } from "react";
import TenantHistoryContent from "./_components/TenantHistoryContent";
import TenantHistorySkeleton from "./_components/TenantHistorySkeleton";

const TenantHistoryPage = async ({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) => {
  const { tenantId } = await params;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tenant History</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Complete rental and review history for this tenant.
        </p>
      </div>

      <Suspense fallback={<TenantHistorySkeleton />}>
        <TenantHistoryContent tenantId={tenantId} />
      </Suspense>
    </div>
  );
};

export default TenantHistoryPage;

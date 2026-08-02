import { Suspense } from "react";

import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";
import AdminUsersList from "../_components/AdminUsersList";

const UsersPageAdminView = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Users</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage all registered users from the admin dashboard.
        </p>
      </div>
      <Suspense fallback={<PropertyTableSkeleton />}>
        <AdminUsersList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default UsersPageAdminView;

import React, { Suspense } from "react";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import AppStatusBadge from "@/components/shared/AppBadge";
import { getAllUsers } from "../_actions/getAllUsers";
import AdminUserTableActionButtons from "./AdminUserTableActionButtons";
import AppSearchBar from "@/components/shared/AppSearchBar";
import AppFilter, { FilterField } from "@/components/shared/AppFilter";
import AppPagination from "@/components/shared/AppPagination";
import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";

type User = {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "BAN" | "UNBAN";
  createdAt: string;
  profile?: { avatar?: string; phone?: string };
};

const columns: TableColumn<User>[] = [
  {
    label: "Serial No",
    slug: "serial_no",
    render: (_item, index) => <span>{(index ?? 0) + 1}</span>,
  },
  { label: "Name", slug: "name", render: (item) => <span>{item.name}</span> },
  {
    label: "Email",
    slug: "email",
    render: (item) => <span>{item.email}</span>,
  },
  {
    label: "Role",
    slug: "role",
    render: (item) => <span className="font-medium">{item.role}</span>,
  },
  {
    label: "Status",
    slug: "status",
    render: (item) => <AppStatusBadge status={item.status} />,
  },
  {
    label: "Joined On",
    slug: "createdAt",
    render: (item) => (
      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    label: "Action",
    slug: "action",
    render: (item) => <AdminUserTableActionButtons item={item} />,
  },
];

const filterFields: FilterField[] = [
  {
    type: "single-checkbox",
    label: "Status",
    paramKey: "status",
    options: [
      { label: "Banned", value: "BAN" },
      { label: "Active", value: "UNBAN" },
    ],
  },
  {
    type: "single-checkbox",
    label: "Role",
    paramKey: "role",
    options: [
      { label: "Admin", value: "ADMIN" },
      { label: "Landlord", value: "LANDLORD" },
      { label: "Tenant", value: "TENANT" },
    ],
  },
  {
    type: "single-checkbox",
    label: "Sort By",
    paramKey: "sortBy",
    options: [{ label: "Created Date", value: "createdAt" }],
  },
  {
    type: "single-checkbox",
    label: "Sort Order",
    paramKey: "sortOrder",
    options: [
      { label: "Ascending (Newest)", value: "desc" },
      { label: "Descending (Oldest)", value: "asc" },
    ],
  },
];

const AdminUsersList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getAllUsers({ query });
  const users: User[] = result?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <AppSearchBar placeholder="Search by name or email..." />
        <AppFilter fields={filterFields} />
      </div>

      <Suspense fallback={<PropertyTableSkeleton />}>
        <AppDataTable tableHeader={columns} tableData={users} />
      </Suspense>

      <AppPagination
        page={result?.meta?.page}
        limit={result?.meta?.limit}
        total={result?.meta?.total}
      />
    </div>
  );
};

export default AdminUsersList;

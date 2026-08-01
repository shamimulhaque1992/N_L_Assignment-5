import React from "react";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import { getAllRentalRequests } from "../../_actions/getAllRentalRequests";
import TenantTableActionButtons from "../_components/TanentTableActionButtons";
import AppStatusBadge from "@/components/shared/AppBadge";
import AppSearchBar from "@/components/shared/AppSearchBar";
import AppFilter, { FilterField } from "@/components/shared/AppFilter";
import AppPagination from "@/components/shared/AppPagination";

type RentalRequest = {
  id: string;
  propertyId: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
  };
  [key: string]: unknown;
};

const columns: TableColumn<RentalRequest>[] = [
  {
    label: "Serial No",
    slug: "serial_no",
    render: (_item, index) => <span>{(index ?? 0) + 1}</span>,
  },
  {
    label: "Property Name",
    slug: "propertyId",
    render: (item) => <span>{item?.property?.title}</span>,
  },
  {
    label: "Status",
    slug: "status",
    render: (item) => <AppStatusBadge status={item.status} />,
  },
  {
    label: "Requested On",
    slug: "createdAt",
    render: (item) => (
      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    label: "Action",
    slug: "action",
    render: (item) => <TenantTableActionButtons item={item} />,
  },
];

const filterFields: FilterField[] = [
  {
    type: "single-checkbox",
    label: "Status",
    paramKey: "status",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Approved", value: "APPROVED" },
      { label: "Rejected", value: "REJECTED" },
      { label: "Active", value: "ACTIVE" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
  {
    type: "single-checkbox",
    label: "Sort By Date",
    paramKey: "createdAt",
    options: [
      { label: "Newest First", value: "DESC" },
      { label: "Oldest First", value: "ASC" },
    ],
  },
];

const AllMyRequestDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getAllRentalRequests({ query });

  // Safely fallback to empty array if data is missing
  const requests: RentalRequest[] = result?.data ?? [];

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

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <AppSearchBar placeholder="Search by property name..." />
        <AppFilter fields={filterFields} />
      </div>

      <AppDataTable tableHeader={columns} tableData={requests} />

      <AppPagination
        page={result?.meta?.page}
        limit={result?.meta?.limit}
        total={result?.meta?.total}
      />
    </div>
  );
};

export default AllMyRequestDashboardPage;

import React, { Suspense } from "react";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import { getAllRentalRequests } from "../../_actions/getAllRentalRequests";
import LandlordTableActionButtons from "../_components/LandlordTableActionButtons";
import AppSearchBar from "@/components/shared/AppSearchBar";
import AppFilter, { FilterField } from "@/components/shared/AppFilter";
import AppPagination from "@/components/shared/AppPagination";
import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";

type RentalRequest = {
  id: string;
  propertyId: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
  };
  tenant: {
    name: string;
    email: string;
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
    label: "Tenant",
    slug: "tenant",
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{item?.tenant?.name}</span>
        <span className="text-xs text-muted-foreground">
          {item?.tenant?.email}
        </span>
      </div>
    ),
  },
  {
    label: "Status",
    slug: "status",
    render: (item) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          item.status === "APPROVED"
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-600"
            : item.status === "ACTIVE"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-600"
              : item.status === "CANCELLED"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-600"
                : item.status === "REJECTED"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-600"
                  : item.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-600"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-600"
        }`}
      >
        {item.status}
      </span>
    ),
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
    render: (item) => <LandlordTableActionButtons item={item} />,
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

const AllPropertyRequestDashboardListing = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getAllRentalRequests({ query });

  const requests: RentalRequest[] = result?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <AppSearchBar placeholder="Search by property name or tenant..." />
        <AppFilter fields={filterFields} />
      </div>

      <Suspense fallback={<PropertyTableSkeleton />}>
        <AppDataTable tableHeader={columns} tableData={requests} />
      </Suspense>

      <AppPagination
        page={result?.meta?.page}
        limit={result?.meta?.limit}
        total={result?.meta?.total}
      />
    </div>
  );
};

export default AllPropertyRequestDashboardListing;

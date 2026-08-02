import React from "react";
import { getAllPaymentHistories } from "../_actions/getAllPaymentHistory";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppStatusBadge from "@/components/shared/AppBadge";
import AppSearchBar from "@/components/shared/AppSearchBar";
import AppFilter, { FilterField } from "@/components/shared/AppFilter";
import AppPagination from "@/components/shared/AppPagination";

type Payment = {
  id: string;
  amount: string;
  provider: string;
  method: string;
  status: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  rentalRequest: {
    property: {
      title: string;
    };
  };
};

const columns: TableColumn<Payment>[] = [
  {
    label: "Serial No",
    slug: "serial_no",
    render: (_item, index) => <span>{(index ?? 0) + 1}</span>,
  },
  {
    label: "Property",
    slug: "property",
    render: (item) => (
      <span className="font-medium">{item.rentalRequest.property.title}</span>
    ),
  },
  {
    label: "Amount",
    slug: "amount",
    render: (item) => (
      <span className="font-semibold text-primary">
        ${Number(item.amount).toFixed(2)}
      </span>
    ),
  },
  {
    label: "Provider",
    slug: "provider",
    render: (item) => (
      <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
        {item.provider}
      </span>
    ),
  },
  {
    label: "Method",
    slug: "method",
    render: (item) => (
      <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
        {item.method}
      </span>
    ),
  },
  {
    label: "Status",
    slug: "status",
    render: (item) => <AppStatusBadge status={item.status} />,
  },
  {
    label: "Paid On",
    slug: "paidAt",
    render: (item) => (
      <span>
        {item.paidAt ? new Date(item.paidAt).toLocaleDateString() : "-"}
      </span>
    ),
  },
  {
    label: "Action",
    slug: "action",
    render: (item) => (
      <Button variant="outline" size="sm" className="flex items-center gap-1.5">
        <Link href={`/dashboard/tenant/payment-history/${item.id}`}>
          View Details
        </Link>
      </Button>
    ),
  },
];

const filterFields: FilterField[] = [
  {
    type: "single-checkbox",
    label: "Payment Status",
    paramKey: "status",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Failed", value: "FAILED" },
      { label: "Refunded", value: "REFUNDED" },
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

const TenantPaymentHistoryListing = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getAllPaymentHistories({ query });

  const payments: Payment[] = result?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <AppSearchBar placeholder="Search by property or provider..." />
        <AppFilter fields={filterFields} />
      </div>

      <AppDataTable tableHeader={columns} tableData={payments} />

      <AppPagination
        page={result?.meta?.page}
        limit={result?.meta?.limit}
        total={result?.meta?.total}
      />
    </div>
  );
};

export default TenantPaymentHistoryListing;

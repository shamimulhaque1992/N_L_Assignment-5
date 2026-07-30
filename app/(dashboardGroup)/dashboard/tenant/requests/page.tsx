import React from "react";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import { getAllRentalRequests } from "../../_actions/getAllRentalRequests";
import TenantTableActionButtons from "../_components/TanentTableActionButtons";

// ─── Type for a single rental request row ─────────────────────────────────────
type RentalRequest = {
  id: string;
  propertyId: string;
  status: string;
  createdAt: string;
  property: {
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
    render: (item) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          item.status === "ACTIVE"
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-600"
            : item.status === "REJECTED"
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-600"
              : item.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-600"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-600"
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
    render: (item) => <TenantTableActionButtons item={item} />,
  },
];

// ─── Page (Server Component) ──────────────────────────────────────────────────
const AllMyRequestDashboardPage = async () => {
  const result = await getAllRentalRequests({ query: {} });

  // Safely fallback to empty array if data is missing
  const requests: RentalRequest[] = result?.data ?? [];
  console.log(requests, "requests");
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

      <AppDataTable tableHeader={columns} tableData={requests} />
    </div>
  );
};

export default AllMyRequestDashboardPage;

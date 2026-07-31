import React from "react";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import { getAllRentalRequests } from "../../_actions/getAllRentalRequests";
import TenantTableActionButtons from "../_components/TanentTableActionButtons";
import AppStatusBadge from "@/components/shared/AppBadge";

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

const AllMyRequestDashboardPage = async () => {
  const result = await getAllRentalRequests({ query: {} });

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

      <AppDataTable tableHeader={columns} tableData={requests} />
    </div>
  );
};

export default AllMyRequestDashboardPage;

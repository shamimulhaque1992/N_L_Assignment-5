import React from "react";
import { getAllPaymentHistories } from "../_actions/getAllPaymentHistory";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppStatusBadge from "@/components/shared/AppBadge";

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
        </Link>{" "}
      </Button>
    ),
  },
];

const AllPaymentsDashboardPage = async () => {
  const result = await getAllPaymentHistories({ query: {} });

  const payments: Payment[] = result?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View all of your completed and pending payment transactions.
        </p>
      </div>

      <AppDataTable tableHeader={columns} tableData={payments} />
    </div>
  );
};

export default AllPaymentsDashboardPage;

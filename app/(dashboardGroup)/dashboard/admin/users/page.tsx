import React from "react";
import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import AppStatusBadge from "@/components/shared/AppBadge";
import { getAllUsers } from "../_actions/getAllUsers";
import AdminUserTableActionButtons from "../_components/AdminUserTableActionButtons";

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
const UsersPageAdminView = async () => {
  const result = await getAllUsers({ query: {} });
  const users: User[] = result?.data ?? [];
  return (
    <div className="p-6 space-y-6">
      {" "}
      <div>
        {" "}
        <h1 className="text-2xl font-bold tracking-tight">All Users</h1>{" "}
        <p className="text-muted-foreground text-sm mt-1">
          {" "}
          Manage all registered users from the admin dashboard.{" "}
        </p>{" "}
      </div>{" "}
      <AppDataTable tableHeader={columns} tableData={users} />{" "}
    </div>
  );
};
export default UsersPageAdminView;

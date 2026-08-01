import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import React from "react";
import { getAllCategories } from "@/app/(publicGroup)/properties/_actions/getAllCategories";
import Link from "next/link";
import PropertyTableActionButtons from "../_components/PropertyTableActionButtons";
import { getAllMyProperties } from "../_actions/getAllMyProperties";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  landlord: {
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
  amenities: string[];
  [key: string]: unknown;
};

const LandLordAllMyPropertiesDashboardPage = async () => {
  const [result, categoriesResult] = await Promise.all([
    getAllMyProperties({ query: {} }),
    getAllCategories(),
  ]);
  const categories = categoriesResult?.data ?? [];

  const columns: TableColumn<Property>[] = [
    {
      label: "Serial No",
      slug: "serial_no",
      render: (_item, index) => <span>{(index ?? 0) + 1}</span>,
    },
    {
      label: "Property Name",
      slug: "propertyId",
      render: (item) => <span>{item?.title}</span>,
    },
    {
      label: "Category",
      slug: "category",
      render: (item) => <span>{item?.category?.name}</span>,
    },
    {
      label: "Location",
      slug: "address",
      render: (item) => <span>{item?.address}</span>,
    },
    {
      label: "Price",
      slug: "price",
      render: (item) => <span>{item?.price}</span>,
    },
    {
      label: "Amenities",
      slug: "amenities",
      render: (item) => (
        <div className="flex flex-wrap gap-1">
          {item?.amenities?.map((amenity, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-600"
            >
              {amenity}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Status",
      slug: "status",
      render: (item) => {
        const statusStyles = {
          AVAILABLE:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-600",
          UNAVAILABLE:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-600",
        };

        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              statusStyles[item.status as "AVAILABLE" | "UNAVAILABLE"]
            }`}
          >
            {item.status}
          </span>
        );
      },
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
      render: (item) => (
        <PropertyTableActionButtons item={item} categories={categories} />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center w-full">
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight">
            Rental Properties
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            All rental properties you have listed are shown below.
          </p>
        </div>

        <div className="flex justify-end">
          <Link
            href={"/dashboard/landlord/properties/new"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add New Property
          </Link>
        </div>
      </div>

      <AppDataTable tableHeader={columns} tableData={result?.data} />
    </div>
  );
};

export default LandLordAllMyPropertiesDashboardPage;

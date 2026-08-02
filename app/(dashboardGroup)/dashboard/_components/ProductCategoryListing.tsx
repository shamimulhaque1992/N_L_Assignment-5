import AppDataTable, { TableColumn } from "@/components/shared/AppDataTable";
import React from "react";
import { getAllCategories } from "@/app/(publicGroup)/properties/_actions/getAllCategories";
import AppSearchBar from "@/components/shared/AppSearchBar";
import AppPagination from "@/components/shared/AppPagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateCategoryForm from "./CreateCategoryForm";
import CategoryTableActionButtons from "./CategoryTableActionButtons";
import { Category } from "../landlord/_components/PropertyTableActionButtons";

const ProductCategoriesListing = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getAllCategories({ query });

  const columns: TableColumn<Category>[] = [
    {
      label: "Serial No",
      slug: "serial_no",
      render: (_item, index) => <span>{(index ?? 0) + 1}</span>,
    },
    {
      label: "Category Name",
      slug: "name",
      render: (item) => <span>{item?.name}</span>,
    },

    {
      label: "Action",
      slug: "action",
      render: (item) => <CategoryTableActionButtons item={item} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center w-full">
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="">
                Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Enter the name of the new category.
                </DialogDescription>

                <CreateCategoryForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <AppSearchBar placeholder="Search by title, location..." />
      </div>

      <AppDataTable tableHeader={columns} tableData={result?.data} />

      <AppPagination
        page={result?.meta?.page}
        limit={result?.meta?.limit}
        total={result?.meta?.total}
      />
    </div>
  );
};

export default ProductCategoriesListing;

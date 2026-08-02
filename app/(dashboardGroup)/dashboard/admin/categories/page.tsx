import React from "react";
import ProductCategoriesListing from "../../_components/ProductCategoryListing";

const ProductCategoriesPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center w-full">
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight">
            Rental Property Categories
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            All rental properties categories are shown below.
          </p>
        </div>
      </div>

      <ProductCategoriesListing searchParams={searchParams} />
    </div>
  );
};

export default ProductCategoriesPage;

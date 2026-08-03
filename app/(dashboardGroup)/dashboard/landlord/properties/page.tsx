import { Suspense } from "react";
import Link from "next/link";
import { PropertyTableSkeleton } from "../../_components/PropertyTableSkeleton";
import LandLordAllMyPropertiesListing from "../_components/LandLordAllMyPropertiesListing";
import { Button } from "@/components/ui/button";

const LandLordAllMyPropertiesDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between items-center w-full gap-y-4 gap-x-6">
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight">
            Rental Properties
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            All rental properties you have listed are shown below.
          </p>
        </div>

        <div className="flex justify-end">
          <Link href={"/dashboard/landlord/properties/new"}>
            <Button variant={"outline"} className="cursor-pointer">
              Add New Category
            </Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<PropertyTableSkeleton />}>
        <LandLordAllMyPropertiesListing searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default LandLordAllMyPropertiesDashboardPage;

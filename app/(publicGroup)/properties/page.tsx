import React, { Suspense } from "react";
import AllPropertiesList from "./_components/AllPropertiesList";
import PropertyScalliton from "./_components/PropertyScalliton";

const AllPropertyListingPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 w-full overflow-hidden">
      <Suspense fallback={<PropertyScalliton count={6} />}>
        <AllPropertiesList searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default AllPropertyListingPage;



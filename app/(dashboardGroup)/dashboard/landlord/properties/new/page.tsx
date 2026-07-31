import React from "react";
import { getAllCategories } from "@/app/(publicGroup)/properties/_actions/getAllCategories";
import CreatePropertyForm from "../../_components/CreatePropertyForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateNewPropertyDashboardPage() {
  const categoriesResult = await getAllCategories();
  const categories = categoriesResult?.data ?? [];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/dashboard/landlord/properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Create New Property
        </h1>
        <p className="text-muted-foreground text-sm">
          Fill in the details below to list a new rental property.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
        <CreatePropertyForm categories={categories} />
      </div>
    </div>
  );
}

"use server";

import React from "react";
import { IProperty } from "@/lib/types";
import PropertyCard from "./PropertyCard";
import PropertyScalliton from "./PropertyScalliton";
import { Building2, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { getAllProperties } from "../_actions/getAllProperties";
import AppSearchBar from "@/components/shared/AppSearchBar";

export const AllPropertiesList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getAllProperties({ query });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 md:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md text-indigo-200 border border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Discover Top Destinations</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Explore Places to Stay
          </h1>
          <p className="text-indigo-100/80 text-sm md:text-base leading-relaxed">
            Find cabins, apartments, villas, and modern homes tailored to your
            journey.
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-32 -bottom-20 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <AppSearchBar placeholder="Search by title, location, or description..." />

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 hidden sm:block shrink-0 ml-1" />
          {/* {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))} */}
        </div>
      </div>

      {/* Content Grid / Skeleton / Empty state */}
      {false ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyScalliton count={6} />
        </div>
      ) : result.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result?.data.map((property: IProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No properties found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Try tweaking your search term or select a different category filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesList;

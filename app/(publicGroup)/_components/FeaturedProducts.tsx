import Link from "next/link";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import PropertyCard from "../properties/_components/PropertyCard";
import { getAllProperties } from "../properties/_actions/getAllProperties";
import { IProperty } from "@/lib/types";

const FeaturedProducts = async () => {
  const result = await getAllProperties({ query: { limit: "6" } });
  const properties: IProperty[] = result?.data ?? [];
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-8">
      {/* Section heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Featured Listings
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Latest Properties
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Hand-picked from our freshest listings.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-5 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Property grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
          <Building2 className="h-10 w-10 text-slate-400 mb-3" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No properties available right now.
          </p>
        </div>
      )}

      {/* CTA below grid */}
      <div className="flex justify-center pt-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
        >
          Explore All Properties
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;

import { ArrowRight, Building2, Filter, Search, Star } from "lucide-react";
import Link from "next/link";

const FunctionalFeatureOfApp = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <Filter className="h-3.5 w-3.5" />
            Advanced Search & Filter
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Find Exactly What You&apos;re Looking For
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
            Use our powerful search bar with debounce, combined with multi-field
            filters — status, category, price range, location, and date sorting.
            Results are paginated so you stay in control.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-all mt-2"
          >
            Try it Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3 w-full">
          {[
            {
              icon: Search,
              label: "Keyword Search",
              desc: "Title, location, description",
            },
            {
              icon: Filter,
              label: "Status Filter",
              desc: "Available / Unavailable",
            },
            {
              icon: Building2,
              label: "Category Filter",
              desc: "Apartment, Villa, Cabin…",
            },
            {
              icon: Star,
              label: "Price & Date Sort",
              desc: "ASC / DESC ordering",
            },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-start gap-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm"
            >
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {label}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunctionalFeatureOfApp;

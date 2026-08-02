import { CreditCard, Filter, LayoutDashboard, Search } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: CreditCard,
            title: "Stripe Payments",
            desc: "Secure, fast, and reliable payment processing via Stripe. Pay your rent online with ease.",
            color:
              "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800/60",
          },
          {
            icon: LayoutDashboard,
            title: "Personal Dashboard",
            desc: "Tenants manage requests & payments. Landlords manage properties. Admins see everything.",
            color:
              "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/60",
          },
          {
            icon: Filter,
            title: "Advanced Filters",
            desc: "Filter by status, category, price range, location and more. Find exactly what you need.",
            color:
              "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60",
          },
          {
            icon: Search,
            title: "Smart Search",
            desc: "Real-time search with debounce and paginated results so you're never overwhelmed.",
            color:
              "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/60",
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            className="flex flex-col gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center border ${color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

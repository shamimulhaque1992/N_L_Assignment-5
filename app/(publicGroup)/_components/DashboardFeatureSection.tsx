import { BadgeCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardFeatureSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-sm px-3.5 py-1 text-xs font-semibold text-indigo-200">
            <LayoutDashboard className="h-3.5 w-3.5" />
            Role-Based Dashboard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Everything Managed in One Place
          </h2>
          <p className="text-indigo-100/70 text-sm max-w-lg mx-auto">
            Log in to unlock your personal dashboard — tailored to your role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              role: "Tenant",
              color: "from-blue-600/20 to-blue-800/10 border-blue-500/30",
              badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
              features: [
                "Browse & search properties",
                "Submit rental requests with a message",
                "Track request status in real time",
                "Manage & view payment history",
                "Submit reviews after completion",
              ],
            },
            {
              role: "Landlord",
              color: "from-violet-600/20 to-violet-800/10 border-violet-500/30",
              badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
              features: [
                "List & manage your properties",
                "Toggle availability instantly",
                "Review incoming rental requests",
                "Approve, reject or mark as complete",
                "Dashboard stats & revenue overview",
              ],
            },
            {
              role: "Admin",
              color:
                "from-emerald-600/20 to-emerald-800/10 border-emerald-500/30",
              badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
              features: [
                "Platform-wide property management",
                "User management (ban / unban / roles)",
                "Monitor all rental requests",
                "Full dashboard statistics overview",
                "Category & review management",
              ],
            },
          ].map(({ role, color, badge, features }) => (
            <div
              key={role}
              className={`rounded-2xl border bg-gradient-to-br ${color} p-6 space-y-4 backdrop-blur-sm`}
            >
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${badge}`}
              >
                {role}
              </span>
              <ul className="space-y-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <BadgeCheck className="h-4 w-4 text-indigo-300 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 hover:bg-indigo-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
          >
            <LayoutDashboard className="h-4 w-4" />
            Access Your Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardFeatureSection;

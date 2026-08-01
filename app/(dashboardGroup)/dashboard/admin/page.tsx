import React from "react";
import { getAdmindStat } from "./_actions/getAdminStat";
import {
  Building2,
  CheckCircle2,
  Clock,
  Folder,
  Home,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

const AdminDashboardPage = async () => {
  const result = await getAdmindStat();
  const stats = result?.data;

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/60",
      border: "border-indigo-200 dark:border-indigo-800/60",
    },
    {
      label: "Tenants",
      value: stats?.totalTenants ?? 0,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/60",
      border: "border-blue-200 dark:border-blue-800/60",
    },
    {
      label: "Landlords",
      value: stats?.totalLandlords ?? 0,
      icon: Users,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950/60",
      border: "border-violet-200 dark:border-violet-800/60",
    },
    {
      label: "Total Properties",
      value: stats?.totalProperties ?? 0,
      icon: Building2,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-50 dark:bg-slate-800/60",
      border: "border-slate-200 dark:border-slate-700/60",
    },
    {
      label: "Available",
      value: stats?.availableProperties ?? 0,
      icon: Home,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      border: "border-emerald-200 dark:border-emerald-800/60",
    },
    {
      label: "Unavailable",
      value: stats?.unavailableProperties ?? 0,
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/60",
      border: "border-rose-200 dark:border-rose-800/60",
    },
    {
      label: "Categories",
      value: stats?.totalCategories ?? 0,
      icon: Folder,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/60",
      border: "border-orange-200 dark:border-orange-800/60",
    },
    {
      label: "Total Requests",
      value: stats?.totalRentalRequests ?? 0,
      icon: TrendingUp,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-950/60",
      border: "border-cyan-200 dark:border-cyan-800/60",
    },
    {
      label: "Pending",
      value: stats?.pendingRequests ?? 0,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/60",
      border: "border-amber-200 dark:border-amber-800/60",
    },
    {
      label: "Approved",
      value: stats?.approvedRequests ?? 0,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/60",
      border: "border-green-200 dark:border-green-800/60",
    },
    {
      label: "Completed",
      value: stats?.completedRequests ?? 0,
      icon: CheckCircle2,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-950/60",
      border: "border-teal-200 dark:border-teal-800/60",
    },
    {
      label: "Rejected",
      value: stats?.rejectedRequests ?? 0,
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/60",
      border: "border-red-200 dark:border-red-800/60",
    },
    {
      label: "Total Reviews",
      value: stats?.totalReviews ?? 0,
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-950/60",
      border: "border-yellow-200 dark:border-yellow-800/60",
    },
    {
      label: "Average Rating",
      value: `${(stats?.averageRating ?? 0).toFixed(1)} ★`,
      icon: Star,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-950/60",
      border: "border-pink-200 dark:border-pink-800/60",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform-wide overview of users, properties, requests, and reviews.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
            >
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border ${card.bg} ${card.border}`}
              >
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  {card.label}
                </p>
                <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const statusConfig = {
    PENDING: {
      label: "Pending",
      badge:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-600 dark:border-yellow-500",
      icon: <Clock className="h-4 w-4" />,
    },

    APPROVED: {
      label: "Approved",
      badge:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-500",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },

    AVAILABLE: {
      label: "Available",
      badge:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-600 dark:border-green-500",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },

    ACTIVE: {
      label: "Active",
      badge:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-600 dark:border-blue-500",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },

    COMPLETED: {
      label: "Completed",
      badge:
        "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border border-slate-600 dark:border-slate-500",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },

    FAILED: {
      label: "Failed",
      badge:
        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-600 dark:border-red-500",
      icon: <XCircle className="h-4 w-4" />,
    },

    REJECTED: {
      label: "Rejected",
      badge:
        "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-600 dark:border-rose-500",
      icon: <XCircle className="h-4 w-4" />,
    },

    CANCELLED: {
      label: "Cancelled",
      badge:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-600 dark:border-orange-500",
      icon: <XCircle className="h-4 w-4" />,
    },

    UNAVAILABLE: {
      label: "Unavailable",
      badge:
        "bg-zinc-100 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-400 border border-zinc-600 dark:border-zinc-500",
      icon: <XCircle className="h-4 w-4" />,
    },
  } as const;
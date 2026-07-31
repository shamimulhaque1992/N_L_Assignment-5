import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AppStatusBadgeProps = {
  status: string;
};
const statusStyles: Record<string, string> = {
  // Green
  APPROVED:
    "border-emerald-600 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400",

  AVAILABLE:
    "border-green-600 bg-green-100 text-green-700 hover:bg-green-100 dark:border-green-500 dark:bg-green-900/30 dark:text-green-400",

  // Blue
  ACTIVE:
    "border-blue-600 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400",

  // Gray
  COMPLETED:
    "border-slate-600 bg-slate-100 text-slate-700 hover:bg-slate-100 dark:border-slate-500 dark:bg-slate-900/30 dark:text-slate-300",

  UNAVAILABLE:
    "border-zinc-600 bg-zinc-100 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-900/30 dark:text-zinc-400",

  // Yellow
  PENDING:
    "border-yellow-600 bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400",

  // Reds
  FAILED:
    "border-red-600 bg-red-100 text-red-700 hover:bg-red-100 dark:border-red-500 dark:bg-red-900/30 dark:text-red-400",

  REJECTED:
    "border-rose-600 bg-rose-100 text-rose-700 hover:bg-rose-100 dark:border-rose-500 dark:bg-rose-900/30 dark:text-rose-400",

  CANCELLED:
    "border-orange-600 bg-orange-100 text-orange-700 hover:bg-orange-100 dark:border-orange-500 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function AppStatusBadge({ status }: AppStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 font-semibold",
        statusStyles[status] ??
          "border-gray-500 bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400",
      )}
    >
      {status}
    </Badge>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 11 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-background p-5 shadow-sm min-h-[110px]"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

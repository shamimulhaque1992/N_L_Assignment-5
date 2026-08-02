import { Skeleton } from "@/components/ui/skeleton";

export function PropertyTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border bg-background shadow-sm overflow-hidden">
      {/* Desktop / tablet table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-6" />
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-44" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-18 rounded-full" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-11 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-16 rounded-xl" />
                    <Skeleton className="h-9 w-20 rounded-xl" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="lg:hidden divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-18 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-14 rounded-lg" />
                <Skeleton className="h-8 w-18 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination skeleton */}
      <div className="border-t p-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

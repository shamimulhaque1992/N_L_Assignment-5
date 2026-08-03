import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TenantHistorySkeleton = () => {
  return (
    <div className="space-y-6 w-full">
      {/* Back Button Skeleton */}
      <Skeleton className="h-5 w-32" />

      {/* Tenant Profile Card Skeleton */}
      <Card className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex justify-center md:justify-start">
              <Skeleton className="h-20 w-20 md:h-24 md:w-24 rounded-full" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="text-center md:text-left space-y-2">
                <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                <Skeleton className="h-6 w-24 mx-auto md:mx-0" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rental History Skeleton */}
      <Card className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-3 md:p-4 space-y-3"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1">
                    <Skeleton className="w-full sm:w-20 h-40 sm:h-20 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review History Skeleton */}
      <Card className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border rounded-lg p-3 md:p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Skeleton className="w-full sm:w-20 h-40 sm:h-20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantHistorySkeleton;

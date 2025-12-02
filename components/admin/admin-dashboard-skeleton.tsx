import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Charts skeletons */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders table skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          {/* Filters skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-64" />
          </div>

          {/* Table skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Skeleton className="h-16 flex-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

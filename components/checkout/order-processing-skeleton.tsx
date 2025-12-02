import { Skeleton } from "@/components/ui/skeleton";

export function OrderProcessingSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
        {/* Header skeleton */}
        <div className="p-8 text-center space-y-4">
          <Skeleton className="mx-auto w-16 h-16 rounded-full" />
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto h-4 w-48" />
        </div>

        {/* Content skeleton */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <Skeleton className="w-5 h-5 mt-0.5 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full max-w-xs" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border flex gap-3">
            <Skeleton className="flex-1 h-12 rounded-md" />
            <Skeleton className="flex-1 h-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-9 w-64" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-border p-4"
              >
                <Skeleton className="h-24 w-24 shrink-0 rounded-md" />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-32 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <Skeleton className="mb-4 h-6 w-48" />

            <div className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}

              <div className="my-4 h-px bg-border" />

              <div className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            <Skeleton className="w-full h-12 mt-8 rounded-md" />

            <Skeleton className="mt-4 mx-auto h-3 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

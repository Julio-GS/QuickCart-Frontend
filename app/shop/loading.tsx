import { ProductGridSkeleton } from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-9 w-32 mb-8" />

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block space-y-6">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </aside>

        <main>
          <ProductGridSkeleton count={12} />

          <div className="mt-8 flex items-center justify-center gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-10" />
          </div>
        </main>
      </div>
    </div>
  );
}

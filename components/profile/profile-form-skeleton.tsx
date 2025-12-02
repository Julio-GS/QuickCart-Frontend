import { Skeleton } from "@/components/ui/skeleton";

export function ProfileFormSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow p-8">
      <Skeleton className="h-8 w-32 mb-6" />
      <div className="space-y-4">
        {/* Full name field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        {/* Email field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        {/* Phone field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        {/* Address field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

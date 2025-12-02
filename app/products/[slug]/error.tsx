"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error in development only
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="mb-2 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="outline">
            Try Again
          </Button>
          <Button asChild>
            <a href="/shop">Browse Products</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

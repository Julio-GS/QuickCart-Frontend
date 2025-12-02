"use client";

import { OrderErrorView } from "@/components/checkout/order-error-view";
import { OrderProcessingSkeleton } from "@/components/checkout/order-processing-skeleton";
import { OrderSuccessView } from "@/components/checkout/order-success-view";
import { useOrderProcessor } from "@/lib/hooks/use-order-processor";
import { useSessionStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CheckoutConfirmationPage() {
  const { user, token } = useSessionStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { status, isProcessing } = useOrderProcessor({
    userId: user?.id,
    token,
    userAddress: user?.address,
    mounted,
  });

  // Prevent hydration mismatch by showing skeleton until mounted
  if (!mounted || isProcessing) {
    return (
      <div className="container mx-auto px-4 py-16">
        <OrderProcessingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {status === "success" && <OrderSuccessView />}
      {status === "error" && <OrderErrorView />}
      {status === "processing" && <OrderProcessingSkeleton />}
    </div>
  );
}

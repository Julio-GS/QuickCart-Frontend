import { useToast } from "@/components/ui/use-toast";
import {
  completeCheckoutSession,
  createOrder,
  getCheckoutSession,
} from "@/lib/api";
import { useCartStore } from "@/lib/store";
import { sanitizeUrlParam } from "@/lib/validators";
import { useEffect, useRef, useState } from "react";

interface UseOrderProcessorOptions {
  userId: string | undefined;
  token: string | null;
  userAddress: string | undefined;
  mounted: boolean;
}

type OrderStatus = "processing" | "success" | "error";

export function useOrderProcessor({
  userId,
  token,
  userAddress,
  mounted,
}: UseOrderProcessorOptions) {
  const [status, setStatus] = useState<OrderStatus>("processing");
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCartStore();
  const { toast } = useToast();
  const processedRef = useRef(false);

  useEffect(() => {
    const processOrder = async () => {
      // Wait for component to mount
      if (!mounted) {
        return;
      }

      // Wait for session hydration
      if (!userId || !token) {
        return;
      }

      // Prevent multiple executions
      if (processedRef.current || isProcessing) {
        return;
      }

      processedRef.current = true;
      setIsProcessing(true);

      try {
        const params = new URLSearchParams(window.location.search);
        const rawSessionId =
          params.get("sessionId") || params.get("session_id");

        // Sanitize URL parameter to prevent XSS attacks
        const sessionId = sanitizeUrlParam(rawSessionId);

        if (!sessionId) {
          throw new Error("Invalid or missing session ID");
        }

        const sessionData = await getCheckoutSession(sessionId, token);

        if (
          !sessionData.cartData?.items ||
          sessionData.cartData.items.length === 0
        ) {
          throw new Error("No cart items found in session");
        }

        // Validate user has delivery address
        if (!userAddress) {
          throw new Error(
            "No delivery address found. Please update your profile."
          );
        }

        const orderData = {
          items: sessionData.cartData.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          deliveryAddress: userAddress,
        };

        const newOrder = await createOrder(token, orderData);

        if (newOrder) {
          await completeCheckoutSession(sessionId, token);
          clearCart();

          toast({
            title: "Order Placed Successfully!",
            description: "Your order has been confirmed.",
          });

          setStatus("success");
        }
      } catch (error: any) {
        toast({
          title: "Order Failed",
          description:
            error.message || "Failed to create order. Please contact support.",
          variant: "destructive",
        });
        setStatus("error");
      } finally {
        setIsProcessing(false);
      }
    };

    processOrder();
  }, [mounted, userId, token, userAddress, isProcessing, clearCart, toast]);

  return { status, isProcessing };
}

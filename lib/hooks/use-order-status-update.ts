import { useToast } from "@/components/ui/use-toast";
import { updateOrderStatus } from "@/lib/api";
import { OrderStatus } from "@/lib/types";
import { useState } from "react";

interface UseOrderStatusUpdateOptions {
  token: string | null;
  onSuccess?: () => void;
}

export function useOrderStatusUpdate({
  token,
  onSuccess,
}: UseOrderStatusUpdateOptions) {
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const { toast } = useToast();

  const STATUS_LABELS: Record<OrderStatus, string> = {
    Pending: "Pending",
    Processing: "Processing",
    Shipped: "Shipped",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
  };

  const updateStatus = async (
    orderId: string,
    newStatus: OrderStatus,
    onLocalUpdate: (orderId: string, newStatus: OrderStatus) => void
  ) => {
    if (!token) return;

    setUpdatingOrderId(orderId);

    try {
      await updateOrderStatus(orderId, newStatus, token);
      onLocalUpdate(orderId, newStatus);

      toast({
        title: "Estado actualizado",
        description: `La orden ${orderId} ahora está en estado ${STATUS_LABELS[newStatus]}`,
      });

      // Call success callback to refresh stats
      onSuccess?.();
    } catch (err: any) {
      toast({
        title: "Error al actualizar",
        description:
          err.message || "No se pudo actualizar el estado de la orden",
        variant: "destructive",
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return { updateStatus, updatingOrderId };
}

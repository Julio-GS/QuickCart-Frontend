import { getAllOrders } from "@/lib/api";
import { Order } from "@/lib/types";
import { useEffect, useState } from "react";

interface UseOrdersOptions {
  token: string | null;
  mounted: boolean;
}

export function useOrders({ token, mounted }: UseOrdersOptions) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!token || !mounted) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllOrders(token, {
        sortBy: "createdAt",
        sortOrder: "DESC",
      });
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err: any) {
      setError(err.message || "Error fetching orders");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, mounted]);

  return { orders, setOrders, isLoading, error, refetch: fetchOrders };
}

import { getUserOrderHistory } from "@/lib/api";
import { Order } from "@/lib/types";
import { useEffect, useState } from "react";

interface UseOrderHistoryOptions {
  userId: string | undefined;
  userRole: string | undefined;
  isLoggedIn: boolean;
  token: string | null;
}

export function useOrderHistory({
  userId,
  userRole,
  isLoggedIn,
  token,
}: UseOrderHistoryOptions) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!userId || userRole !== "Client" || !isLoggedIn || !token) {
        setOrders([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getUserOrderHistory(userId, token);
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err: any) {
        setError(err.message || "Error fetching orders");
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [userId, userRole, isLoggedIn, token]);

  return { orders, isLoading, error };
}

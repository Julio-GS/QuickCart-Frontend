import { getUserById } from "@/lib/api";
import { User } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

interface UseUserDataOptions {
  userId: string | undefined;
  token: string | null;
  onSuccess?: (userData: Partial<User>) => void;
}

export function useUserData({ userId, token, onSuccess }: UseUserDataOptions) {
  const [userData, setUserData] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (!userId || !token) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getUserById(userId, token);
        const userData: Partial<User> = {
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        };
        setUserData(userData);
        onSuccess?.(userData);
      } catch (err: any) {
        setError(err.message || "Error fetching user data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token, refetchTrigger]);

  return { userData, isLoading, error, refetch };
}

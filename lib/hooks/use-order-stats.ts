import { getAdminOrderStats } from "@/lib/api";
import { useEffect, useState } from "react";

interface UseOrderStatsOptions {
  token: string | null;
  mounted: boolean;
}

export function useOrderStats({ token, mounted }: UseOrderStatsOptions) {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!token || !mounted) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getAdminOrderStats(token);
      setStats(data);
    } catch (err: any) {
      setError(err.message || "No se pudo obtener estadísticas de órdenes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token, mounted]);

  return { stats, isLoading, error, refetch: fetchStats };
}

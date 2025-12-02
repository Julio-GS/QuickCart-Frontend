import { getAdminProductStats } from "@/lib/api";
import { useEffect, useState } from "react";

interface UseProductStatsOptions {
  token: string | null;
  mounted: boolean;
}

export function useProductStats({ token, mounted }: UseProductStatsOptions) {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token || !mounted) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getAdminProductStats(token);
        setStats(data);
      } catch (err: any) {
        setError(err.message || "No se pudo obtener estadísticas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [token, mounted]);

  return { stats, isLoading, error };
}

import { useState, useEffect, useCallback } from 'react';
import dashboardService from '../services/dashboardService';

export function useDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    byCategory: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [totalData, countData, categoryData] = await Promise.all([
        dashboardService.getTotalExpenses(),
        dashboardService.getExpensesCount(),
        dashboardService.getExpensesByCategory(),
      ]);
      setStats({
        total: totalData.total || 0,
        count: countData.count || 0,
        byCategory: categoryData || [],
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

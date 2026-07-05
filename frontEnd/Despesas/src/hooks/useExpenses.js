import { useState, useEffect, useCallback } from 'react';
import expenseService from '../services/expenseService';
import toast from 'react-hot-toast';

export function useExpenses(initialFilters = {}) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseService.getAll(filters);
      console.log(data.data)
      setExpenses(data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar despesas');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const createExpense = useCallback(async (data) => {
    try {
      const newExpense = await expenseService.create(data);
      setExpenses(prev => [newExpense, ...prev]);
      toast.success('Despesa criada com sucesso!');
      return newExpense;
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao criar despesa';
      toast.error(msg);
      throw err;
    }
  }, []);

  const updateExpense = useCallback(async (id, data) => {
    try {
      const updated = await expenseService.update(id, data);
      setExpenses(prev => prev.map(e => {
        const eData = e.dataValues || e;
        return eData.id === id ? updated : e;
      }));
      toast.success('Despesa atualizada com sucesso!');
      return updated;
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao atualizar despesa';
      toast.error(msg);
      throw err;
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await expenseService.delete(id);
      setExpenses(prev => prev.filter(e => {
        const eData = e.dataValues || e;
        return eData.id !== id;
      }));
      toast.success('Despesa removida com sucesso!');
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao remover despesa';
      toast.error(msg);
      throw err;
    }
  }, []);

  return {
    expenses,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
}

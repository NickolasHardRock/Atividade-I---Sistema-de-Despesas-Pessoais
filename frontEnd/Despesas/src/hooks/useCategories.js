import { useState, useEffect, useCallback } from 'react';
import categoryService from '../services/categoryService';
import toast from 'react-hot-toast';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(async (data) => {
    try {
      const newCat = await categoryService.create(data);
      setCategories(prev => [...prev, newCat]);
      toast.success('Categoria criada com sucesso!');
      return newCat;
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao criar categoria';
      toast.error(msg);
      throw err;
    }
  }, []);

  const updateCategory = useCallback(async (id, data) => {
    try {
      const updated = await categoryService.update(id, data);
      setCategories(prev => prev.map(c => {
        const cData = c.dataValues || c;
        return cData.id === id ? updated : c;
      }));
      toast.success('Categoria atualizada com sucesso!');
      return updated;
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao atualizar categoria';
      toast.error(msg);
      throw err;
    }
  }, []);

  const deleteCategory = useCallback(async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(c => {
        const cData = c.dataValues || c;
        return cData.id !== id;
      }));
      toast.success('Categoria removida com sucesso!');
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao remover categoria';
      toast.error(msg);
      throw err;
    }
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

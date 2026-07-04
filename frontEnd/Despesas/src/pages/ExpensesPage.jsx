import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';
import { Trash2, Edit2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function ExpensesPage() {
  const { expenses, loading, createExpense, updateExpense, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [filters, setFilters] = useState({
    category: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (editingId) {
        await updateExpense(editingId, formData);
      } else {
        await createExpense(formData);
      }
      setFormData({ title: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], description: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    const exp = expense.dataValues || expense;
    setFormData({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      description: exp.description || '',
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta despesa?')) {
      await deleteExpense(id);
    }
  };

  const filteredExpenses = expenses.filter(exp => {
    const e = exp.dataValues || exp;
    if (filters.category && e.category !== filters.category) return false;
    return true;
  });

  if (loading) return <div className="text-center py-8">Carregando despesas...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Despesas</h1>
        <button
          onClick={() => {
            setFormData({ title: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], description: '' });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={20} /> Nova Despesa
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {editingId ? 'Editar Despesa' : 'Nova Despesa'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => {
                    const c = cat.dataValues || cat;
                    return <option key={c.id} value={c.name}>{c.name}</option>;
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                {editingId ? 'Atualizar' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todas as categorias</option>
          {categories.map(cat => {
            const c = cat.dataValues || cat;
            return <option key={c.id} value={c.name}>{c.name}</option>;
          })}
        </select>
      </div>

      {/* Lista de Despesas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {filteredExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Título</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Categoria</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Valor</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Data</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => {
                  const exp = expense.dataValues || expense;
                  return (
                    <tr key={exp.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{exp.title}</td>
                      <td className="py-3 px-4">
                        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-xs">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                        R$ {parseFloat(exp.amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {new Date(exp.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                          title="Deletar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Nenhuma despesa encontrada
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensesPage;

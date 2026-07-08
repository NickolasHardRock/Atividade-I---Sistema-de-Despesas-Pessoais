import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { useCategories } from '../hooks/useCategories';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Edit2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import React from 'react';

function ExpensesPage() {
  const { expenses, loading: expensesLoading, createExpense, updateExpense, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const { user, loading: authLoading } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = {
    title: '',
    amount: '',
    description: '',
    status: 'PENDENTE',
    date: new Date().toISOString().split('T')[0],
    fkUsuarioId: '',
    fkCategoryId: '',

    
    
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const [filters, setFilters] = useState({
    fkCategoryId: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCategoryName = (categoryId) => {
    if (!categories) return 'Carregando...';
    const category = categories.find(cat => {
      const c = cat.dataValues || cat;
      return Number(c.id) === Number(categoryId); // Comparação como número
    });
    const cObj = category?.dataValues || category;
    return cObj ? cObj.name : 'Sem categoria';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.id) {
      toast.error('Erro: Usuário não identificado.');
      return;
    }

    console.log(user.id)

    if (!formData.title || !formData.amount || !formData.fkCategoryId || !formData.status) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

   
    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
      fkCategoryId: Number(formData.fkCategoryId),
      fkUsuarioId: Number(user.id) 
    };

    try {
      if (editingId) {
        await updateExpense(Number(editingId), expenseData); 
        toast.success('Despesa atualizada!');
      } else {
        await createExpense(expenseData);
        toast.success('Despesa criada!');
      }
      
      setFormData(initialFormState);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar despesa');
    }
  };

  const handleEdit = (expense) => {
    const exp = expense.dataValues || expense;
    setFormData({
      title: exp.title,
      amount: exp.amount,
      fkCategoryId: exp.fkCategoryId,
      date: exp.date,
      description: exp.description || '',
      status: exp.status || 'PENDENTE',
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta despesa?')) {
      try {
        await deleteExpense(Number(id)); // Garante que ID da deleção é número
        toast.success('Despesa deletada!');
      } catch (error) {
        toast.error('Erro ao deletar');
      }
    }
  };

  const filteredExpenses = (Array.isArray(expenses) ? expenses : []).filter(exp => {
    const e = exp.dataValues || exp;
    if (filters.fkCategoryId && Number(e.fkCategoryId) !== Number(filters.fkCategoryId)) return false;
    if (filters.status && e.status !== filters.status) return false;
    return true;
  });

  if (authLoading || expensesLoading) return <div>Carregando...</div>;

  return (
    <div>
      <div>
        <h1>Despesas</h1>
        <button
          onClick={() => {
            setFormData(initialFormState);
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={20} /> Nova Despesa
        </button>
      </div>

      {showForm && (
        <div>
          <h2>{editingId ? 'Editar Despesa' : 'Nova Despesa'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Título *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div>
                <label>Valor *</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} step="0.01" min="0" required />
              </div>
              <div>
                <label>Categoria *</label>
                <select name="fkCategoryId" value={formData.fkCategoryId} onChange={handleInputChange} required>
                  <option value="">Selecione uma categoria</option>
                  {Array.isArray(categories) && categories.map((cat, idx) => {
                    const c = cat.dataValues || cat;
                    return <option key={c.id ?? `cat-${idx}`} value={c.id}>{c.name}</option>;
                  })}
                </select>
              </div>
              <div>
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="PENDENTE">Pendente</option>
                  <option value="PAGA">Paga</option>
                </select>
              </div>
              <div>
                <label>Data</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <label>Descrição</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
            </div>
            <div>
              <button type="submit">{editingId ? 'Atualizar' : 'Criar'}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <select value={filters.fkCategoryId} onChange={(e) => setFilters({ ...filters, fkCategoryId: e.target.value })}>
          <option value="">Todas as categorias</option>
          {Array.isArray(categories) && categories.map((cat, idx) => {
            const c = cat.dataValues || cat;
            return <option key={c.id ?? `cat-filter-${idx}`} value={c.id}>{c.name}</option>;
          })}
        </select>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Todos os status</option>
          <option value="PENDENTE">Pendentes</option>
          <option value="PAGA">Pagas</option>
        </select>
      </div>

      <div>
        {filteredExpenses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, idx) => {
                const exp = expense.dataValues || expense;
                return (
                  <tr key={exp.id ?? `expense-${idx}`}>
                    <td>{exp.title}</td>
                    <td>{getCategoryName(exp.fkCategoryId)}</td>
                    <td>R$ {parseFloat(exp.amount).toFixed(2)}</td>
                    <td>{new Date(exp.date).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <span style={{ color: exp.status === 'PAGA' ? 'green' : 'orange', fontWeight: 'bold' }}>
                        {exp.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(expense)}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(exp.id)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma despesa encontrada</p>
        )}
      </div>
    </div>
  );
}

export default ExpensesPage;

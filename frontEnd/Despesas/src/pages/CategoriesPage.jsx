import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { Trash2, Edit2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function CategoriesPage() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6366f1',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Nome da categoria é obrigatório');
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, formData);
      } else {
        await createCategory(formData);
      }
      setFormData({ name: '', description: '', color: '#6366f1' });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    const cat = category.dataValues || category;
    setFormData({
      name: cat.name,
      description: cat.description || '',
      color: cat.color || '#6366f1',
    });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta categoria?')) {
      await deleteCategory(id);
    }
  };

  if (loading) return <div>Carregando categorias...</div>;

  return (
    <div>
      <div>
        <h1>Categorias</h1>
        <button
          onClick={() => {
            setFormData({ name: '', description: '', color: '#6366f1' });
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={20} /> Nova Categoria
        </button>
      </div>

      {showForm && (
        <div>
          <h2>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Cor</label>
                <div>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    value={formData.color}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div>
              <label>Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
            <div>
              <button type="submit">
                {editingId ? 'Atualizar' : 'Criar'}
              </button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        {categories.length > 0 ? (
          categories.map((category) => {
            const cat = category.dataValues || category;
            return (
              <div key={cat.id} style={{ borderLeftColor: cat.color }}>
                <div>
                  <div>
                    <h3>{cat.name}</h3>
                    {cat.description && <p>{cat.description}</p>}
                  </div>
                  <div style={{ backgroundColor: cat.color }} />
                </div>
                <div>
                  <button onClick={() => handleEdit(category)}>
                    <Edit2 size={16} /> Editar
                  </button>
                  <button onClick={() => handleDelete(cat.id)}>
                    <Trash2 size={16} /> Deletar
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            Nenhuma categoria encontrada
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;

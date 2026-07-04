import api from './api';

const expenseService = {
  async getAll(params = {}) {
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/expenses', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/expenses/${id}`);
  },
};

export default expenseService;

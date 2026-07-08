import api from './api';

const expenseService = {
  async getAll(params = {}) {
    const response = await api.get('/despesas', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/despesas/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/despesas/', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/despesas/${id}`, data);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/despesas/${id}`);
  },
};

export default expenseService;

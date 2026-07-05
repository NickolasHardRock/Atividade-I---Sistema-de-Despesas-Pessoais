import api from './api';

const categoryService = {
  async getAll() {
    const response = await api.get('/categoria');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/categoria/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/categoria', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/categoria/${id}`, data);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/categoria/${id}`);
  },
};

export default categoryService;

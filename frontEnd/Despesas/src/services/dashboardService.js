import api from './api';

const dashboardService = {
  async getTotalExpenses() {
    const response = await api.get('/dashboard/total-expenses');
    return response.data;
  },

  async getExpensesCount() {
    const response = await api.get('/dashboard/expenses-count');
    return response.data;
  },

  async getExpensesByCategory() {
    const response = await api.get('/dashboard/expenses-by-category');
    return response.data;
  },
};

export default dashboardService;

import api from './api';

const dashboardService = {
  async getTotalExpenses() {
    const response = await api.get('/dashboard/total-expense');
    return response.data.data;
  },

  async getExpensesCount() {
    const response = await api.get('/dashboard/expenses-count');
    return response.data.data;
  },

  async getExpensesByCategory() {
    const response = await api.get('/dashboard/expenses-by-category');
    return response.data.data;
  },
};

export default dashboardService;

import api from './api';

const authService = {
  async login(email, password) {
    console.log(email,password)
    const response = await api.post('/usuarios/login', { email, password });
    console.log(response)
    return response.data;
  },

  async register(name, email, senha) {
    const response = await api.post('/usuarios', { name, email, senha });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

export default authService;

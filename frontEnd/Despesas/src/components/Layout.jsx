import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useState } from 'react';

function Layout() {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">💰 Despesas</h1>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <nav className="flex gap-4">
                  <a
                    href="/dashboard"
                    className={`px-3 py-2 rounded-lg transition ${
                      isActive('/dashboard')
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Dashboard
                  </a>
                  <a
                    href="/expenses"
                    className={`px-3 py-2 rounded-lg transition ${
                      isActive('/expenses')
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Despesas
                  </a>
                  <a
                    href="/categories"
                    className={`px-3 py-2 rounded-lg transition ${
                      isActive('/categories')
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Categorias
                  </a>
                </nav>

                <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-600 pl-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    title={isDark ? 'Modo claro' : 'Modo escuro'}
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition text-red-600"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
              <nav className="md:hidden mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <a href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</a>
                <a href="/expenses" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Despesas</a>
                <a href="/categories" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Categorias</a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
                >
                  Sair
                </button>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

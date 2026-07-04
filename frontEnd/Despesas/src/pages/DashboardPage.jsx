import { useEffect, useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useExpenses } from '../hooks/useExpenses';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ListTodo } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

function DashboardPage() {
  const { stats, loading: statsLoading } = useDashboard();
  const { expenses, loading: expensesLoading } = useExpenses();
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    if (expenses.length > 0) {
      const recent = expenses.slice(0, 5);
      setRecentExpenses(recent);
    }
  }, [expenses]);

  if (statsLoading || expensesLoading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total de Gastos</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                R$ {stats.total?.toFixed(2) || '0.00'}
              </p>
            </div>
            <DollarSign className="text-indigo-600 dark:text-indigo-400" size={40} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Quantidade de Despesas</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {stats.count || 0}
              </p>
            </div>
            <ListTodo className="text-purple-600 dark:text-purple-400" size={40} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Média por Despesa</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                R$ {stats.count > 0 ? (stats.total / stats.count).toFixed(2) : '0.00'}
              </p>
            </div>
            <TrendingUp className="text-green-600 dark:text-green-400" size={40} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Despesas por Categoria</h2>
          {stats.byCategory && stats.byCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.byCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Sem dados</p>
          )}
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Distribuição por Categoria</h2>
          {stats.byCategory && stats.byCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.byCategory}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Sem dados</p>
          )}
        </div>
      </div>

      {/* Últimas Despesas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Últimas Despesas</h2>
        {recentExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-2 text-gray-600 dark:text-gray-400">Título</th>
                  <th className="text-left py-2 px-2 text-gray-600 dark:text-gray-400">Categoria</th>
                  <th className="text-left py-2 px-2 text-gray-600 dark:text-gray-400">Valor</th>
                  <th className="text-left py-2 px-2 text-gray-600 dark:text-gray-400">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense) => {
                  const exp = expense.dataValues || expense;
                  return (
                    <tr key={exp.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-2 text-gray-800 dark:text-gray-200">{exp.title}</td>
                      <td className="py-3 px-2">
                        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-xs">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-semibold text-gray-800 dark:text-gray-200">
                        R$ {parseFloat(exp.amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">
                        {new Date(exp.date).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Nenhuma despesa registrada</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

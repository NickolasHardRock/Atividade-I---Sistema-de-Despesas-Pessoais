import { useEffect, useState } from 'react';
import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useExpenses } from '../hooks/useExpenses';

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
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <div>
          <p>Total de Gastos</p>
          <p>R$ {stats.total?.toFixed(2) || '0.00'}</p>
        </div>

        <div>
          <p>Quantidade de Despesas</p>
          <p>{stats.count || 0}</p>
        </div>

        <div>
          <p>Média por Despesa</p>
          <p>R$ {stats.count > 0 ? (stats.total / stats.count).toFixed(2) : '0.00'}</p>
        </div>
      </div>

    
      <div>
        <div>
          <h2>Despesas por Categoria</h2>
          {stats.byCategory && stats.byCategory.length > 0 ? (
            <ul>
              {stats.byCategory.map((c) => (
                <li key={c.category}>
                  {c.category}: R$ {parseFloat(c.total).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem dados</p>
          )}
        </div>

        <div>
          <h2>Distribuição por Categoria</h2>
          {stats.byCategory && stats.byCategory.length > 0 ? (
            <ul>
              {stats.byCategory.map((c) => (
                <li key={c.category}>
                  {c.category}: {c.total}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem dados</p>
          )}
        </div>
      </div>

     
      <div>
        <h2>Últimas Despesas</h2>
        {recentExpenses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((expense) => {
                const exp = expense.dataValues || expense;
                return (
                  <tr key={exp.id}>
                    <td>{exp.title}</td>
                    <td>{exp.category}</td>
                    <td>R$ {parseFloat(exp.amount).toFixed(2)}</td>
                    <td>{new Date(exp.date).toLocaleDateString('pt-BR')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma despesa registrada</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

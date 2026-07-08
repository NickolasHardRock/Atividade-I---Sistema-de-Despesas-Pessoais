import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import React from 'react';

function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div>
        <header>
          <div>
            <div>
              <h1>💰 Despesas</h1>
              <div>
                <div>
                  <span>{user?.name}</span>
                  <br />
                  <button onClick={handleLogout}>
                    Sair
                  </button>
                  <br />
                </div>
              </div>

              <div>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? 'Fechar Menu' : 'Abrir Menu'}
                </button>
              </div>
            </div>

            {menuOpen && (
              <nav>
                <a href="/dashboard">Dashboard</a>
                <br />
                <a href="/expenses">Despesas</a>
                <br />
                <a href="/categories">Categorias</a>
                <br />
                <button onClick={handleLogout}>Sair</button>
              </nav>
            )}
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
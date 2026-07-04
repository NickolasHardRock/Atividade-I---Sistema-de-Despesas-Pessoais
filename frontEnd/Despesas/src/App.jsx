import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

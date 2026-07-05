import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        
          <AppRoutes />
          <Toaster position="top-right" />
        
      </AuthProvider>
    </Router>
  );
}

export default App;

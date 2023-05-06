import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthForms from './components/Forms/AuthForms';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const API_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api`;

  const handleLogin = (token: string) => {
    setToken(token);
  };

  return (
    <Router>
      {token ? (
        <>        
        <Navbar />
          <Routes>
              <Route
                  path="/"
                  element={<HomePage />}
              />
              {/* Add other routes here when the user is logged in */}
          </Routes>
        </>
      ) : (
        <AuthForms
            onLogin={handleLogin}
            API_URL={API_URL}
        />
      )}
    </Router>
  );
};

export default App;

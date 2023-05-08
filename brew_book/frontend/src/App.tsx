import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthForms from './components/Forms/AuthForms';
import { refreshAccessToken, isAccessTokenExpired } from './components/Forms/helpers/auth';
import Cookies from 'js-cookie';

const isAuthenticated = ():boolean => {
  const access = Cookies.get('access');
  return !!access;
};

const API_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api`;

console.log(API_URL)

const App: React.FC = () => {
  const [token, setToken] = useState(
    isAuthenticated() ? 
    Cookies.get('access') :
    false
  );

  const refreshTokenIfNeeded = async () => {
    if (isAccessTokenExpired()) {
      const newAccessToken = await refreshAccessToken(API_URL);
      if (newAccessToken) {
        setToken(newAccessToken);
      } else {
        handleLogout();
      }
    }
  };

  const handleLogin = (token: string) => {
    console.log("token: " + token)
    setToken(token);
  };

  const handleLogout = () => {
    setToken(false)
  }

  useEffect(()=> {

  }, [token])

  return (
    <Router>
      {token ? (
        <>        
        <Navbar 
          onLogout={handleLogout}
        />
          <Routes>
              <Route
                  path="/"
                  element={<HomePage refreshTokenIfNeeded ={refreshTokenIfNeeded} />}
              />
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

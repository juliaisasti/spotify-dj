import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./App.css";
import Home from './components/pages/Home';

function App() {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const access_token = query.get('access_token');
    const refresh_token = query.get('refresh_token');

    if (access_token && refresh_token) {
      // Guarda los tokens en localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      // Limpia la query string para evitar mostrar los tokens en la URL
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;

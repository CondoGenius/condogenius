import React from 'react';
import Home from './components/home/home';
import Login from './views/login/login';

import { BrowserRouter } from 'react-router-dom';

export default function App() {
  const user = localStorage.getItem('user');

  return (
    <BrowserRouter>
      {
      user ? 
          <Home /> 
        : 
          <Login />
      }
    </BrowserRouter>
  );
}

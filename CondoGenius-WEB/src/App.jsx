import React from 'react';
import { useSelector } from "react-redux";
import RoutesConfig from './routes';

import Home from './components/home/home';
import Login from './views/login/login';

import { BrowserRouter } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const user = useSelector(state => state.user.data);

  return (
    <BrowserRouter>
      <ToastContainer />
      {
      user.isLogged ? 
          <Home /> 
        : 
          <RoutesConfig>
            <Login />
          </RoutesConfig>
      }
    </BrowserRouter>
  );
}

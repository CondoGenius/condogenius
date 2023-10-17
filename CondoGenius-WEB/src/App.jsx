import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home/home';
import RoutesConfig from './routes';
import Login from './views/login/login';

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

import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'; // Importe BrowserRouter como Router

import Home from './components/home/home';
import Login from './components/login/login';

const RoutesConfig = () => {
  return (
    <Router>
      <Switch> {/* Use o Switch para renderizar apenas a primeira rota que corresponda ao caminho */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Switch>
    </Router>
  );
};

export default RoutesConfig;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Complaints from './components/complaints/complaints';
import Home from './components/home/home';
import Login from './components/login/login';
import Reservations from './components/reservations/reservations';
import Residents from './components/residents/residents';

const RoutesConfig = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/residents" component={Residents} />
      <Route path="/reservations" component={Reservations} />
      {/* reunioes */}
      <Route path="/complaints" component={Complaints} />
      {/* checkin */}
      {/* entregas */}
    </Switch>
  );
};


export default RoutesConfig;

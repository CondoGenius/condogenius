import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';

import Complaints from './components/complaints/complaints';
import Home from './components/home/home';
import Login from './components/login/login';
import Reservations from './components/reservations/reservations';
import Residents from './components/residents/residents';
import ResidentForm from './components/residents/containers/form/resident_form';

const RoutesConfig = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={App} />

      <Route path="/residents" exact component={Residents} />
      <Route path="/residents/new" exact component={ResidentForm} />

      <Route path="/reservations" component={Reservations} />
      {/* reunioes */}
      <Route path="/complaints" component={Complaints}  />
      {/* checkin */}
      {/* entregas */}
    </Switch>
  );
};

export default RoutesConfig;

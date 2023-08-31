import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';

import Complaints from './views/complaints/complaints';
import Home from './components/home/home';
import Reservations from './views/reservations/reservations';
import Residents from './views/residents/residents';

const RoutesConfig = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={App} />

      <Route path="/residents" exact component={Residents} />

      <Route path="/reservations" component={Reservations} />
      {/* reunioes */}
      <Route path="/complaints" component={Complaints}  />
      {/* checkin */}
      {/* entregas */}
    </Switch>
  );
};

export default RoutesConfig;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';

import Complaints from './views/complaints/complaints.tsx';
import Home from './components/home/home';
import Reservations from './views/reservations/reservations';
import ListReservations from './views/reservations/list/list_reservations.tsx';
import Residents from './views/residents/residents';
import Profile from './views/profile/profile';

const RoutesConfig = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={App} />

      <Route path="/residents" exact component={Residents} />

      <Route path="/reservations" component={Reservations} />
      <Route path="/list-resident-reservations" component={ListReservations} />
      
      {/* reunioes */}
      <Route path="/complaints" component={Complaints}  />
      {/* checkin */}
      {/* entregas */}
      {<Route path="/profile" exact component={Profile} />}
    </Switch>
  );
};

export default RoutesConfig;

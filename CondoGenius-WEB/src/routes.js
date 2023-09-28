import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ComplaintsResidentView from './views/complaints/admin_view/complaints';
import ComplaintsAdminView from './views/complaints/user_view/complaints';

import ReservationsResidentView from './views/reservations/resident_view/reservations';
import ListReservationsResidentView from './views/reservations/resident_view/list/list_reservations';
import ReservationsAdminView from './views/reservations/admin_view/reservations';

import Residents from './views/residents/residents';

import DeliveriesResidentView from './views/deliveries/resident_view/deliveries';
import DeliveriesAdminView from './views/deliveries/admin_view/deliveries';

import Profile from './views/profile/profile';

const RoutesConfig = () => {
  return (
    <Switch>

      {/* Residents */}
      <Route path="/residents" exact component={Residents} />

      {/* Reservations */}
      <Route path="/reservations" component={ReservationsResidentView} />
      <Route path="/my-reservations" component={ListReservationsResidentView} />
      <Route path="/list-reservations" component={ReservationsAdminView} />

      {/* Complaints */}
      <Route path="/complaints" component={ComplaintsAdminView} />
      <Route path="/complaints" component={ComplaintsResidentView} />

      {/* Deliveries */}
      <Route path="/deliveries" component={DeliveriesResidentView} />
      <Route path="/deliveries" component={DeliveriesAdminView} />


      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
};

export default RoutesConfig;

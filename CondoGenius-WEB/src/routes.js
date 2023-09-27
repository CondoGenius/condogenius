import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";

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
  const user = useSelector(state => state.user.data);

  return (
    <Switch>

      {/* Residents */}
      {user.isAdmin && <Route path="/residents" exact component={Residents} />}

      {/* Reservations */}
      {!user.isAdmin && <Route path="/reservations" component={ReservationsResidentView} />}
      {!user.isAdmin && <Route path="/my-reservations" component={ListReservationsResidentView} />}
      {user.isAdmin && <Route path="/list-reservations" component={ReservationsAdminView} />}

      {/* Complaints */}
      {user.isAdmin && <Route path="/complaints" component={ComplaintsAdminView} />}
      {!user.isAdmin && <Route path="/complaints" component={ComplaintsResidentView} />}

      {/* Deliveries */}
      {!user.isAdmin && <Route path="/deliveries" component={DeliveriesResidentView} />}
      {user.isAdmin && <Route path="/deliveries" component={DeliveriesAdminView} />}


      {<Route path="/profile" exact component={Profile} />}
    </Switch>
  );
};

export default RoutesConfig;

import React from 'react';
import { useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import Register from './views/login/containers/register/register';

import ComplaintsResidentView from './views/complaints/admin_view/complaints';
import ComplaintsAdminView from './views/complaints/user_view/complaints';

import ReservationsResidentView from './views/reservations/resident_view/reservations';
import ListReservationsResidentView from './views/reservations/resident_view/list/list_reservations';
import ReservationsAdminView from './views/reservations/admin_view/reservations';

import Residents from './views/residents/residents';

import DeliveriesResidentView from './views/deliveries/resident_view/deliveries';
import DeliveriesAdminView from './views/deliveries/admin_view/deliveries';

import Profile from './views/profile/profile';
import Login from './views/login/login';
import RegisterVerifys from './views/login/containers/register-verifys/register_verifys';

const RoutesConfig = () => {
  const user = useSelector(state => state.user.data);

  return user.isLogged ? (
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
  ) : (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register-verifys" exact component={RegisterVerifys} />
      <Route path="/register" exact component={Register} />
    </Switch>
  );
};

export default RoutesConfig;

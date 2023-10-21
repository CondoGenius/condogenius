import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from 'react-router-dom';

import Register from './views/login/containers/register/register';

import ComplaintsAdminView from './views/complaints/admin_view/complaints';
import ComplaintsResidentView from './views/complaints/resident_view/complaints';

import ReservationsAdminView from './views/reservations/admin_view/reservations';
import ListReservationsResidentView from './views/reservations/resident_view/list/list_reservations';
import ReservationsResidentView from './views/reservations/resident_view/reservations';

import MeetingsResidentView from './views/meetings/resident_view/meetings';

import Residents from './views/residents/residents';

import DeliveriesAdminView from './views/deliveries/admin_view/deliveries';
import DeliveriesResidentView from './views/deliveries/resident_view/deliveries';

import HubDigital from './views/hub_digital/hub_digital';
import RegisterVerifys from './views/login/containers/register-verifys/register_verifys';
import Login from './views/login/login';
import MeetingsAdminView from './views/meetings/admin_view/meetings';
import Profile from './views/profile/profile';
import QuickContactsAdminView from './views/quick_contacts/admin_view/quick_contacts';
import QuickContactsResidentView from './views/quick_contacts/resident_view/quick_contacts';

const RoutesConfig = () => {
  const user = useSelector(state => state.user.data);

  const history = useHistory();

  useEffect(() => {
    if(window.location.pathname === '/' && user.isLogged) {
      history.push('/hub');
    }
  });

  return user.isLogged ? (
    <Switch>
      {/* Hub Digital */}
      <Route path="/hub" exact component={HubDigital} />

      {/* Residents */}
      <Route path="/residents" exact component={Residents} />

      {/* Reservations */}
      <Route path="/reservations" component={ReservationsResidentView} />
      <Route path="/my-reservations" component={ListReservationsResidentView} />
      <Route path="/list-reservations" component={ReservationsAdminView} />

      {/* Meetings */}
      <Route path="/meetings" component={MeetingsAdminView} />
      <Route path="/meetings-list" component={MeetingsResidentView} />

      {/* Complaints */}
      <Route path="/complaints-list" component={ComplaintsAdminView} />
      <Route path="/complaints" component={ComplaintsResidentView} />

      {/* Deliveries */}
      <Route path="/deliveries" component={DeliveriesAdminView} />
      <Route path="/deliveries-list" component={DeliveriesResidentView} />

      {/* Quick Contacts */}
      <Route path="/quick-contacts-list" component={QuickContactsResidentView} />
      <Route path="/quick-contacts" component={QuickContactsAdminView} />

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

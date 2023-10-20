import { combineReducers } from 'redux';

import complaints from './complaints/reducer';
import deliveries from './deliveries/reducer';
import meetings from './meetings/reducer';
import quickContacts from './quick_contacts/reducer';
import reservations from './reservations/reducer';
import residences from './residences/reducer';
import resident from './resident/reducer';
import residents from './residents/reducer';
import user from './user/reducer';

export default combineReducers({
  user,
  residents,
  resident,
  residences,
  deliveries,
  complaints,
  reservations,
  meetings,
  quickContacts
});
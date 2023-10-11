import { combineReducers } from 'redux';

import user from './user/reducer';
import residents from './residents/reducer';
import resident from './resident/reducer';
import residences from './residences/reducer';
import deliveries from './deliveries/reducer';

export default combineReducers({
  user,
  residents,
  resident,
  residences,
  deliveries
});
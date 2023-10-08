import { combineReducers } from 'redux';

import user from './user/reducer';
import residents from './residents/reducer';
import residences from './residences/reducer';

export default combineReducers({
  user,
  residents,
  residences
});
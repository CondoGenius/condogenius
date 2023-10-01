import { combineReducers } from 'redux';

import user from './user/reducer';
import residents from './residents/reducer';

export default combineReducers({
  user,
  residents
});
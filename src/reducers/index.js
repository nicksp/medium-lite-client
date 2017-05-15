import { combineReducers } from 'redux';

import common from './common';
import home from './home';
import auth from './auth';

const appReducer = combineReducers({
  common,
  home,
  auth
});

export default appReducer;

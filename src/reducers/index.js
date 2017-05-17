import { combineReducers } from 'redux';

import common from './common';
import home from './home';
import auth from './auth';
import settings from './settings';

const appReducer = combineReducers({
  common,
  home,
  auth,
  settings
});

export default appReducer;

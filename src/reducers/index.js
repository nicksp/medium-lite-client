import { combineReducers } from 'redux';

import article from './article';
import common from './common';
import home from './home';
import auth from './auth';
import settings from './settings';

const appReducer = combineReducers({
  article,
  common,
  home,
  auth,
  settings
});

export default appReducer;

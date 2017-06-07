import { combineReducers } from 'redux';

import article from './article';
import articleList from './articleList';
import common from './common';
import home from './home';
import auth from './auth';
import profile from './profile';
import settings from './settings';

const appReducer = combineReducers({
  article,
  articleList,
  common,
  home,
  auth,
  profile,
  settings
});

export default appReducer;

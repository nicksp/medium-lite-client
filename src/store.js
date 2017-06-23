import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import { promiseMiddleware, localStorageMiddleware } from './middleware';
import appReducer from './reducers';

const getMiddleware = () => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments
    return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());
  }
}

const store = createStore(appReducer, getMiddleware());

export default store;

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import { promiseMiddleware, localStorageMiddleware } from './middleware';
import appReducer from './reducers';

const getMiddleware = () => {
  const NODE_ENV = process.env.NODE_ENV;

  const isProd = NODE_ENV === 'production';
  const isTest = NODE_ENV === 'test';

  if (isProd || isTest) {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments
    return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());
  }
}

const store = createStore(appReducer, getMiddleware());

export default store;

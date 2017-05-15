import { applyMiddleware, createStore } from 'redux';

import { promiseMiddleware } from './middleware';
import appReducer from './reducers';

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(appReducer, middleware);

export default store;

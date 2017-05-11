import { applyMiddleware, createStore } from 'redux';

import { promiseMiddleware } from './middleware';

const initialState = {
  appName: 'Medium Lite',
  articles: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.payload.articles
      };
    default:
      return state;
  }
};

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;

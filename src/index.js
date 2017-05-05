import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import App from './components/App';

const initialState = {
  appName: 'Medium Lite',
  articles: null
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

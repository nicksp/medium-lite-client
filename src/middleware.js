import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER
} from './constants/actionTypes';

import agent from './agent';

function _isPromise(input) {
  return !!input && typeof input.then === 'function';
}

const promiseMiddleware = store => next => action => {
  if (_isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    action.payload.then(
      response => {
        action.payload = response;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      const userToken = action.payload.user.token;
      window.localStorage.setItem('jwt', userToken);
      agent.setToken(userToken)
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export {
  promiseMiddleware,
  localStorageMiddleware
};

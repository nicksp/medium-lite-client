function _isPromise(input) {
  return !!input && typeof input.then === 'function';
}

const promiseMiddleware = store => next => action => {
  if (_isPromise(action.payload)) {
    action.payload.then(
      response => {
        action.payload = response;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
}

export {
  promiseMiddleware
};

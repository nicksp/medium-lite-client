import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';

const initialState = {
  isInProgress: false,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        isInProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...initialState };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return {
          ...state,
          isInProgress: true
        };
      }
      return state;
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
};

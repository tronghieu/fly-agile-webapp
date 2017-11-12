import Session from './../utils/Session';
import {AFTER_LOGIN, AUTH_ERROR, AUTHENTICATED, DO_LOGIN} from "../const";

const initialState = {
  me: Session.getValue('me'),
  token: Session.getValue('token'),
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case AFTER_LOGIN:
      Session.set('token', action.payload);
      return {
        ...state,
        token: action.payload,
        error: null,
      };

    case AUTHENTICATED:
      Session.set('me', action.payload);

      return {
        ...state,
        me: action.payload,
        isLoading: false,
        authenticated: true,
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state
  }
};
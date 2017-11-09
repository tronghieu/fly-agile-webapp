import Session from './../utils/Session';
import {AUTH_ERROR, AUTHENTICATED, DO_LOGIN} from "../const";

const initialState = {
  me: Session.getValue('user'),
  token: Session.getValue('token'),
  error: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case AUTHENTICATED:
      Session.set(action.payload);
      return {
        ...state,
        token: action.payload.token,
        me: action.payload.me,
        isLoading: false,
        error: null
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
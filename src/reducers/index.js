import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from "./user";
import {loadingBarReducer} from "react-redux-loading-bar";

export default combineReducers({
  routing: routerReducer,
  user,
  loadingBar: loadingBarReducer
});

'use strict';

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createBrowserHistory from 'history/createBrowserHistory'
import rootReducer from './../reducers'
import login from "../saga/auth";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers = [];
const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const Store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

sagaMiddleware.run(login);
// sagaMiddleware.run(getRole)
// sagaMiddleware.run(addRoleSaga)
// sagaMiddleware.run(destroyRoleSaga)
// sagaMiddleware.run(getStaffListSaga)
// sagaMiddleware.run(toggleSAdminSaga)
// sagaMiddleware.run(addStaffSaga)

export default Store;

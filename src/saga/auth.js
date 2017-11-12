import {call, put, takeEvery} from "redux-saga/effects";
import {AUTH_ERROR, DO_LOGIN, AUTHENTICATED, AFTER_LOGIN} from "../const";
import {UserApiEndpoint} from "../endpoints/UserApiEndpoint";
import {hideLoading, showLoading} from "react-redux-loading-bar";

function* login() {
  yield takeEvery(DO_LOGIN, doLogin);
}

function* doLogin(action) {
  try {
    let response = yield call(UserApiEndpoint.oauthTokenPassword, action.payload);
    yield put({type: AFTER_LOGIN, payload: response.data});

    response = yield call(UserApiEndpoint.me, response.data);
    yield put({type: AUTHENTICATED, payload: response.data});

  } catch (error) {
    yield put({type: AUTH_ERROR, payload: error.response})
  }
}

export default login;
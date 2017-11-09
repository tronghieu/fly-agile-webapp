import {call, put, takeEvery} from "redux-saga/effects";
import {AUTH_ERROR, DO_LOGIN, AUTHENTICATED} from "../const";
import {UserApiEndpoint} from "../endpoints/UserApiEndpoint";
import {hideLoading, showLoading} from "react-redux-loading-bar";

function* login() {
  yield takeEvery(DO_LOGIN, doLogin);
}

function* doLogin(action) {
  yield put(showLoading());
  try {
    const response = yield call(UserApiEndpoint.oauthTokenPassword, action.payload);
    const token = response.data;
    const data = {
      access_token: token.access_token,
      ...action.payload
    };

    const me = yield call(UserApiEndpoint.me, data);
    yield put({type: AUTHENTICATED, payload: {
        token: token,
        me: me.data
      }
    });

  } catch (error) {
    yield put({type: AUTH_ERROR, payload: error.response})
  }
  finally {
    yield put(hideLoading());
  }
}

export default login;
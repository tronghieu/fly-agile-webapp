import {DO_LOGIN, LOGOUT} from "../const";

export function login(username, password) {
  return {
    type: DO_LOGIN,
    payload: {
      username: username,
      password: password
    }
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

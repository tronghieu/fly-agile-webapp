import Settings from './../../settings.json';
import axios from "axios";

class Session {
  static get() {
    let data = JSON.parse(window.localStorage.getItem('session'));
    if (!data) {
      data = {};
    }
    return data;
  };

  static getValue(sessionKey, def = null) {
    let data = JSON.parse(window.localStorage.getItem('session'));
    if (!data || !data.hasOwnProperty(sessionKey)) {
      return def;
    }

    return data[sessionKey];
  };

  static set(sessionKey, sessionValue) {
    let data = Session.get();
    data[sessionKey] = sessionValue;
    window.localStorage.setItem('session', JSON.stringify(data));
  };

  static remove() {
    window.localStorage.removeItem('session')
  };

  static ping(accessToken) {
    return axios({
      method: 'post',
      url: Settings.oauth.base_url + "/api/ping",
      headers: {
        'Accept': 'application/json',
        "Authorization": "Bearer " + accessToken
      }
    });
  };

  static refreshToken(token) {
    return axios({
      method: 'post',
      url: Settings.oauth.base_url + "/oauth/token",
      data: {
        'grant_type': 'refresh_token',
        'client_id': Settings.app_id,
        'client_secret': Settings.app_secret_key,
        'refresh_token': token,
        'scope': '*'
      }
    })
  };

  static isAuth() {
    let token = Session.getValue('token');
    if (token && token.hasOwnProperty('access_token') && token.access_token !== "") {
      return true;
    }
    return false;
  }

  static getAccessToken() {
    let token = Session.getValue('token');
    if (token && token.hasOwnProperty('access_token')) {
      return token.access_token;
    }
    return null;
  }
}

export default Session;
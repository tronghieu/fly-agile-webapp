import Settings from './../../settings.json';
import axios from "axios";
import qs from "qs";

export class UserApiEndpoint {
  static oauthTokenPassword = (data) => {
    return axios({
      method: 'post',
      url: Settings.oauth.base_url + "/oauth/token",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        'grant_type' : 'password',
        'client_id' : Settings.oauth.app_id,
        'client_secret' : Settings.oauth.app_secret_key,
        'username' : data.username,
        'password' : data.password,
        'scope' : '*'
      })
    });
  };

  static me = (data) => {
    return axios({
      method: 'get',
      url: Settings.oauth.base_url + "/api/me",
      headers: {
        'Accept': 'application/json',
        "Authorization": "Bearer " + data.access_token
      },
    })
  }
}
import Session from "./Session";

class Auth {
  static isAuthenticated(cb) {
    let isAuthenticated = false;
    let token = Session.get('token');
    let accessToken;
    if (null !== token
      && token.hasOwnProperty('access_token')
      && null != (accessToken = token['access_token'])) {

      Session.ping(accessToken).then(res=> {
        cb(true);
      }).catch(err => {
        cb(false, err);
      });
    }

    cb(false);
  }
}

export default Auth;
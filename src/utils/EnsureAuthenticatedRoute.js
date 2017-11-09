import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import Session from './Session';
import Store from './Store';
import {push} from 'react-router-redux';
import {logout} from "../actions/Auth";

const EnsureAuthenticatedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={
      props => {
        if (!Session.isAuth()) {
          return (
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}/>
          )
        } else {
          let accessToken = Session.getAccessToken();
          Session.ping(accessToken).then(res => {
            //nothing
          }).catch(err => {
            let status = parseInt(err.response.status);
            switch (status) {
              case 401:
                Session.remove();
                Store.dispatch(logout());
                Store.dispatch(push('/login'));
                break;
              default:
                break;
            }
          });

          return (
            <Component {...props} />
          )
        }
      }
    }
    />
  )
};

export default EnsureAuthenticatedRoute

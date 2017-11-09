import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import Store, {history} from './utils/Store'

import EnsureAuthenticatedRoute from './utils/EnsureAuthenticatedRoute';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

import App from './containers/App';
import LoginContainer from './containers/Authen/LoginContainer';
import registerServiceWorker from './registerServiceWorker';
import Register from "./containers/Authen/Register";

ReactDOM.render((
  <Provider store={Store}>
    <HashRouter>
      <Switch>
        <Route path={"/register"} name={"Register"} component={Register}/>
        <Route path="/login" name="Login" component={LoginContainer}/>
        <EnsureAuthenticatedRoute path="/" name="Home" component={App}/>
      </Switch>
    </HashRouter>

  </Provider>
), document.getElementById('root'));

registerServiceWorker();

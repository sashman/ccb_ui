/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import AuthProvider from "components/Auth/AuthProvider";

const hist = createBrowserHistory();

ReactDOM.render(
  <Auth0Provider
    domain="ccbapp.eu.auth0.com"
    clientId="IvOhpg8yK27vRk6lihM5p1ZoHjCek6kG"
    cacheLocation="localstorage"
    redirectUri="http://localhost:3000/admin/dashboard"
  >
    <AuthProvider>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </AuthProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

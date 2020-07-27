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
import { auth0ApiUrl } from "config";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import BackendApiProvider from "components/Auth/BackendApiProvider";
import { ProvideTenant } from "components/Tenant/ProvideTenant";

const hist = createBrowserHistory();

ReactDOM.render(
  <Auth0Provider
    domain="ccbapp.eu.auth0.com"
    audience={`${auth0ApiUrl}/`}
    clientId="IvOhpg8yK27vRk6lihM5p1ZoHjCek6kG"
    cacheLocation="localstorage"
    scope="read:current_user update:current_user_metadata"
    redirectUri="http://localhost:3000/admin/dashboard"
  >
    <ProvideTenant>
      <BackendApiProvider>
        <Router history={hist}>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </Router>
      </BackendApiProvider>
    </ProvideTenant>
  </Auth0Provider>,
  document.getElementById("root")
);

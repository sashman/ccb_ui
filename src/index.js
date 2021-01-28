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
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import BackendApiProvider from "components/Auth/BackendApiProvider";
import { ProvideTenant } from "components/Tenant/ProvideTenant";

const hist = createBrowserHistory();

const oktaAuth = new OktaAuth({
  issuer: "https://dev-27751295.okta.com/oauth2/default",
  clientId: "0oa4fqd3vqYLnBEi75d6",
  redirectUri: window.location.origin + "/login/callback",
  pkce: true,
});

ReactDOM.render(
  <ProvideTenant>
    <Router history={hist}>
      <Security oktaAuth={oktaAuth}>
        <BackendApiProvider>
          <Switch>
            <Route path="/login/callback" component={LoginCallback} />
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BackendApiProvider>
      </Security>
    </Router>
  </ProvideTenant>,
  document.getElementById("root")
);

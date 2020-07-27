import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useAuth0 } from "@auth0/auth0-react";

import roles from "helpers/roles";
import TenantList from "./Widgets/TenantList";
import ProductList from "./Widgets/ProductList";
import CreateYourTenant from "./NoTenant/CreateYourTenant";
import { useTenant } from "components/Tenant/ProvideTenant";

export default function Dashboard() {
  const { hasRole, SUPERUSER } = roles;
  const { tenant } = useTenant();
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  if (hasRole(user, SUPERUSER)) {
    return superuserWidgets();
  }

  if (tenant) {
    return userWidgets();
  }

  return noTenantWidgets(user);
}
function noTenantWidgets(user) {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CreateYourTenant user={user} />
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
      <GridContainer></GridContainer>
    </div>
  );
}

function userWidgets() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <ProductList />
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
      <GridContainer></GridContainer>
    </div>
  );
}

function superuserWidgets() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <TenantList />
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
      <GridContainer></GridContainer>
    </div>
  );
}

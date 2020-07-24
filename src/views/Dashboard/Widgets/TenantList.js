import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import useFetch from "use-http";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function TenantList() {
  const classes = useStyles();

  const { data, loading, error } = useFetch("/api/tenants", {}, []);

  if (error) {
    return "Error!";
  }

  if (loading) {
    return "Loading...";
  }

  return (
    <Card>
      <CardHeader color="success">
        <h4 className={classes.cardTitleWhite}>Tenants</h4>
      </CardHeader>
      <CardBody>
        <Table tableHeaderColor="success" tableData={[data.tenants]} />
      </CardBody>
    </Card>
  );
}

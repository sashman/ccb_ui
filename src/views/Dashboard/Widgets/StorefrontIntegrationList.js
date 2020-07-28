import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import useFetch from "use-http";
import AddIcon from "@material-ui/icons/Add";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import FormDialog from "components/Dialog/Form/FormDialog";

const useStyles = makeStyles(styles);

export default function StorefrontIntegrationList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formFields, setFormFields] = useState({});
  const [storefront_integrations, setStorefrontIntegrations] = useState([]);
  const onFieldsChange = (fieldName) => (e) => {
    const { value } = e.currentTarget;

    setFormFields({
      ...formFields,
      [fieldName]: value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const newStorefrontIntegration = await post({ integration: formFields });

    if (response.ok) {
      setStorefrontIntegrations(
        storefront_integrations.concat(newStorefrontIntegration.data)
      );
    }
    setOpen(false);
  };

  useEffect(() => {
    loadInitialStorefrontIntegrations();
  }, []);

  async function loadInitialStorefrontIntegrations() {
    const initialStorefrontIntegrations = await get();
    if (response.ok)
      setStorefrontIntegrations(initialStorefrontIntegrations.data);
  }

  const { get, post, response, loading, error } = useFetch(
    "/api/storefront_integrations",
    {},
    []
  );

  if (error) {
    return "Error!";
  }

  if (loading) {
    return "Loading...";
  }

  const tableData = storefront_integrations
    ? storefront_integrations.map(({ storefront, name, shop_name }) => [
        storefront,
        name,
        shop_name,
      ])
    : [];

  return (
    <Card>
      <CardHeader color="success">
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <h4 className={classes.cardTitleWhite}>Storefront Integrations</h4>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
            <Button
              size="small"
              className={classes.cardTitleWhite}
              onClick={handleClickOpen}
            >
              <AddIcon />
            </Button>
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardBody>
        <Table tableHeaderColor="success" tableData={tableData} />
      </CardBody>
      <FormDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        onFieldsChange={onFieldsChange}
        title="Create a new integration"
        fields={[
          { id: "title", label: "Title", type: "text" },
          { id: "description", label: "Description", type: "text" },
        ]}
      />
    </Card>
  );
}

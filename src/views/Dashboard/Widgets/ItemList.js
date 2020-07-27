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

export default function ItemList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formFields, setFormFields] = useState({});
  const [items, setItems] = useState([]);
  const onFieldsChange = (fieldName) => (e) => {
    const target = e.target || e.currentTarget;
    const { value } = target;
    console.log(value);

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
    const newItem = await post({ item: formFields });

    if (response.ok) {
      setItems(items.concat(newItem.data));
    }
    setOpen(false);
  };

  useEffect(() => {
    loadInitialProducts();
  }, []);

  async function loadInitialProducts() {
    const initialProducts = await get();
    if (response.ok) setItems(initialProducts.data);
  }

  const { get, post, response, loading, error } = useFetch(
    "/api/items",
    {},
    []
  );

  const {
    data: dataProducts,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch("/api/products", {}, []);

  if (error || errorProducts) {
    return "Error!";
  }

  if (loading || loadingProducts) {
    return "Loading...";
  }

  const tableData = items
    ? items.map(({ sku, quantity, product: { title } }) => [
        title,
        sku,
        quantity,
      ])
    : [];

  return (
    <Card>
      <CardHeader color="warning">
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <h4 className={classes.cardTitleWhite}>Items</h4>
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
        <Table tableHeaderColor="warning" tableData={tableData} />
      </CardBody>
      <FormDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        onFieldsChange={onFieldsChange}
        title="Create a new item"
        fields={[
          { id: "sku", label: "SKU", type: "text" },
          { id: "quantity", label: "Quantity", type: "number", min: 1 },
          {
            id: "product_id",
            label: "Product",
            selectFrom: dataProducts.data.map(({ title, id }) => ({
              label: title,
              value: id,
            })),
          },
        ]}
      />
    </Card>
  );
}

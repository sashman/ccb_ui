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

export default function ProductList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formFields, setFormFields] = useState({});
  const [products, setProducts] = useState([]);
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
    const newProduct = await post({ product: formFields });

    if (response.ok) {
      setProducts(products.concat(newProduct.data));
    }
    setOpen(false);
  };

  useEffect(() => {
    loadInitialProducts();
  }, []);

  async function loadInitialProducts() {
    const initialProducts = await get();
    if (response.ok) setProducts(initialProducts.data);
  }

  const { get, post, response, loading, error } = useFetch(
    "/api/products",
    {},
    []
  );

  if (error) {
    return "Error!";
  }

  if (loading) {
    return "Loading...";
  }

  const tableData = products
    ? products.map(({ title, description }) => [title, description])
    : [];

  return (
    <Card>
      <CardHeader color="success">
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <h4 className={classes.cardTitleWhite}>Products</h4>
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
        title="Create a new product"
        fields={[
          { id: "title", label: "Title", type: "text" },
          { id: "description", label: "Description", type: "text" },
        ]}
      />
    </Card>
  );
}

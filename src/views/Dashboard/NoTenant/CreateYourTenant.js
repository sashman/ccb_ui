import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Name from "components/CurrentUser/Name";
import Button from "components/CustomButtons/Button.js";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CreateYourTenant() {
  const classes = useStyles();
  const SUBDOMIAN_REGEX = /^[A-z0-9-]+$/;
  const [validName, setValidName] = useState(true);
  const [helperText, setHelperText] = useState(null);
  const [name, setName] = useState(null);
  const submitAllowed = validName && !!name && name !== "";

  const onInputChange = (e) => {
    const validName = SUBDOMIAN_REGEX.test(e.currentTarget.value);
    setValidName(validName);
    validName
      ? setHelperText(null)
      : setHelperText("Name must be alphanumeric characters or -.");
    setName(e.currentTarget.value);
  };

  const onSubmit = () => {
    console.log("Sending", name);
  };

  return (
    <Card>
      <CardHeader color="success">
        <h3>
          Welcome <Name />
        </h3>
        <h4 className={classes.cardTitleWhite}>
          To begin, create your tenant here
        </h4>
      </CardHeader>
      <CardBody>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              fullWidth
              error={!validName}
              label="Enter name"
              inputProps={{
                onChange: onInputChange,
              }}
              helperText={helperText}
            />

            <Button
              color="primary"
              disabled={!submitAllowed}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

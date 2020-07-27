import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectField from "components/Forms/SelectField";

export default function FormDialog({
  open,
  handleClose,
  handleSubmit,
  onFieldsChange,
  title,
  text,
  fields,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          {fields.map(({ label, type, id, min, selectFrom }) =>
            !selectFrom ? (
              <TextField
                key={id}
                margin="dense"
                id={id}
                label={label}
                type={type}
                fullWidth
                onChange={onFieldsChange(id)}
                InputProps={{
                  inputProps: {
                    ...(min ? { min } : null),
                  },
                }}
              />
            ) : (
              <SelectField
                key={id}
                margin="dense"
                id={id}
                label={label}
                type={type}
                options={selectFrom}
                onChange={onFieldsChange(id)}
                fullWidth
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onFieldsChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
};

FormDialog.defaultProps = {
  fields: [],
};

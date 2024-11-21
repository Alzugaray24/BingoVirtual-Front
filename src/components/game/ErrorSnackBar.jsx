import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const ErrorSnackbar = ({ error, onClose }) => {
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={onClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};
ErrorSnackbar.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ErrorSnackbar;

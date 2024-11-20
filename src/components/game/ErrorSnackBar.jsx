import React from "react";
import { Snackbar, Alert } from "@mui/material";

const ErrorSnackbar = ({ error, onClose }) => {
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={onClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;

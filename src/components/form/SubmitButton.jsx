import React from "react";
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({ loading, text, onClick, ...props }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClick}
      disabled={loading}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : null
      }
      {...props}
    >
      {loading ? "Cargando..." : text}
    </Button>

  );
};

export default SubmitButton;

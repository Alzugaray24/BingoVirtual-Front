import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <CircularProgress
      color="primary"
      sx={{ display: "block", margin: "auto", marginTop: 3 }}
    />
  );
};

export default LoadingIndicator;

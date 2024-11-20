// src/components/UserNotLogged.jsx

import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserNotLogged = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Es necesario iniciar sesión
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Iniciar sesión
      </Button>
    </Box>
  );
};

export default UserNotLogged;

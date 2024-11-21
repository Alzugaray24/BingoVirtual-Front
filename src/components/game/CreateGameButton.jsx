import React from "react";
import { Button } from "@mui/material";

const CreateGameButton = ({ onCreate }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={onCreate}
      fullWidth
    >
      Crear Juego
    </Button>
  );
};

export default CreateGameButton;

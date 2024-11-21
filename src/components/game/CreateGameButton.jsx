import { Button } from "@mui/material";
import PropTypes from "prop-types";

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
CreateGameButton.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateGameButton;

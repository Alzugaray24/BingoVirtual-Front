import CustomButton from "../game/CustomButton";
import PropTypes from "prop-types";

const StartGameButton = ({ onStart }) => {
  return (
    <CustomButton
      text="Iniciar Juego"
      color="primary"
      size="large"
      onClick={onStart}
      sx={{
        backgroundColor: "#007bff",
        "&:hover": { backgroundColor: "#0056b3" },
      }}
    />
  );
};

StartGameButton.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartGameButton;

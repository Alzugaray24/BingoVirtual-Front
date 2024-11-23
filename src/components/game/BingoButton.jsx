import PropTypes from "prop-types";
import { Button, Tooltip } from "@mui/material";

const BingoButton = ({ onClick }) => {
  return (
    <Tooltip title="¡Haz clic para cantar Bingo!" arrow>
      <Button
        onClick={() => onClick()}
        variant="contained"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#FFFFFF",
          background: "linear-gradient(90deg, #FF5722 0%, #FFC107 100%)",
          borderRadius: "50px",
          padding: "15px 30px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            background: "linear-gradient(90deg, #FFC107 0%, #FF5722 100%)",
            transform: "scale(1.1)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
          },
          "&:active": {
            transform: "scale(0.95)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        Bingo
      </Button>
    </Tooltip>
  );
};

BingoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BingoButton;

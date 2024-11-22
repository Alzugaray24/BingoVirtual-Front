import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const DrawnBalls = ({ drawnBalls }) => {
  return (
    <Typography variant="h6" mb={2}>
      Bolas Extraídas:{" "}
      {drawnBalls.length > 0
        ? drawnBalls
            .map((ball) => ball.newBall) // Extrae el número de cada bola
            .join(", ") // Une los números con comas
        : "Ninguna"}
    </Typography>
  );
};
DrawnBalls.propTypes = {
  drawnBalls: PropTypes.arrayOf(
    PropTypes.shape({
      newBall: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DrawnBalls;

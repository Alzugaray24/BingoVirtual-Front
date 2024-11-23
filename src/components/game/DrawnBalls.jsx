import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const DrawnBalls = ({ drawnBalls }) => {
  return (
    <Box
      mb={3}
      p={2}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" mb={2} sx={{ fontWeight: "bold" }}>
        Bolas Extraídas
      </Typography>
      <Typography variant="body1">
        {drawnBalls.length >= 75
          ? `El proceso ha terminado, las bolas sacadas fueron: ${drawnBalls
              .map((ball) => ball.newBall) // Extrae el número de cada bola
              .join(", ")}` // Une los números con comas
          : drawnBalls.length > 0
          ? drawnBalls
              .map((ball) => ball.newBall) // Extrae el número de cada bola
              .join(", ") // Une los números con comas
          : "Ninguna"}
      </Typography>
    </Box>
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

// MarkedBalls.jsx
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const MarkedBalls = ({ markedBalls }) => {
  console.log(markedBalls);

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
        Bolas Marcadas
      </Typography>
      <Typography variant="body1">
        {markedBalls.length > 0 ? markedBalls.join(", ") : "Ninguna"}
      </Typography>
    </Box>
  );
};

MarkedBalls.propTypes = {
  markedBalls: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MarkedBalls;

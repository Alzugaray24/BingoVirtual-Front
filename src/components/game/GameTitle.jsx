import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const GameTitle = ({ title }) => {
  return (
    <Typography
      variant="h3"
      align="center"
      sx={{
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "4px",
        padding: "10px 20px",
        borderRadius: "8px",
        background: "linear-gradient(90deg, #6E6E6E, #212121, #6E6E6E)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow:
          "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
        animation:
          "pulsate 3s ease-in-out infinite, shimmer 8s linear infinite",
        "@keyframes pulsate": {
          "0%": {
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6)",
          },
          "100%": {
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
          },
        },
        "@keyframes shimmer": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "200% 50%",
          },
        },
        backgroundSize: "200% auto",
      }}
    >
      {title}
    </Typography>
  );
};

GameTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GameTitle;

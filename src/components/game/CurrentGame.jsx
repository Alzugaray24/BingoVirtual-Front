import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const CurrentGame = ({ currentGame, onLeaveGame }) => {
  return (
    <Box sx={{ mt: 4, p: 3, border: "1px solid #333", borderRadius: "8px" }}>
      <Typography variant="h5">Juego actual: {currentGame.name}</Typography>
      <Typography variant="body1">
        Jugadores: {currentGame.players.length}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={onLeaveGame}
        sx={{ mt: 2 }}
      >
        Salir del Juego
      </Button>
    </Box>
  );
};
CurrentGame.propTypes = {
  currentGame: PropTypes.shape({
    name: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
  }).isRequired,
  onLeaveGame: PropTypes.func.isRequired,
};

export default CurrentGame;

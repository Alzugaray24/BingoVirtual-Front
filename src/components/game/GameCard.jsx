import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const GameCard = ({
  game,
  userId,
  onJoinGame,
  onDeleteGame,
  onRemovePlayer,
}) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <Typography variant="body1">
        <strong>Nombre:</strong> {game.name}
      </Typography>
      <Typography variant="body2">
        <strong>Jugadores:</strong> {game.players.length}
      </Typography>
      <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onJoinGame(game._id, userId)}
        >
          Unirse
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDeleteGame(game._id)}
        >
          Eliminar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onRemovePlayer(game._id, userId)}
        >
          Remover Jugador
        </Button>
      </Box>
    </Box>
  );
};
GameCard.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  onJoinGame: PropTypes.func.isRequired,
  onDeleteGame: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
};

export default GameCard;

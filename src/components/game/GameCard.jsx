import CustomButton from "../game/CustomButton";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Ejemplo de ícono

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
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Sombra ligera
      }}
    >
      <Typography variant="body2">
        <strong>Jugadores:</strong> {game.players.length}
      </Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <CustomButton
          text="Unirse"
          color="primary"
          icon={<AddCircleIcon />} // Agrega un ícono
          sx={{
            backgroundColor: "#007bff",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
          onClick={() => onJoinGame(game._id, userId)}
        />
        <CustomButton
          text="Eliminar"
          color="secondary"
          sx={{
            backgroundColor: "#dc3545",
            "&:hover": { backgroundColor: "#a71d2d" },
          }}
          onClick={() => onDeleteGame(game._id)}
        />
        <CustomButton
          text="Remover Jugador"
          color="error"
          sx={{
            backgroundColor: "#ffc107",
            color: "#000",
            "&:hover": { backgroundColor: "#d39e00" },
          }}
          onClick={() => onRemovePlayer(game._id, userId)}
        />
      </Box>
    </Box>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  onJoinGame: PropTypes.func.isRequired,
  onDeleteGame: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
};

export default GameCard;

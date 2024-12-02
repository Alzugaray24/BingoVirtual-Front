import CustomButton from "../game/CustomButton";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Ícono para "Finalizado"

const GameCard = ({ game, userId, onJoinGame, onDeleteGame }) => {
  console.log("actualizado", game);

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
        {game.gameStatus === "en curso" ? (
          <>
            <CustomButton
              disabled
              text="En Curso"
              color="primary"
              icon={<AddCircleIcon />}
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
          </>
        ) : game.gameStatus === "finalizado" ? (
          <>
            <CustomButton
              disabled
              text="Finalizado"
              color="success"
              icon={<CheckCircleIcon />} // Ícono para "Finalizado"
              sx={{
                backgroundColor: "#28a745",
                "&:hover": { backgroundColor: "#218838" },
              }}
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
          </>
        ) : (
          <>
            <CustomButton
              text="Unirse"
              color="primary"
              icon={<AddCircleIcon />}
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
          </>
        )}
      </Box>
    </Box>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    gameStatus: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  onJoinGame: PropTypes.func.isRequired,
  onDeleteGame: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
};

export default GameCard;

import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BingoCard from "../components/game/BingoCard";

const GameInProgress = () => {
  const userId = useSelector((state) => state.auth.userId);
  const currentGame = useSelector((state) => state.game.currentGame);

  // Encuentra el jugador actual basado en el userId
  const player = currentGame.players.find((player) => player.userId === userId);

  return (
    <Box p={3}>
      {player ? (
        <BingoCard
          card={player.card}
          markedNumbers={player.markedNumbers}
          gameId={currentGame._id}
          userId={userId}
        />
      ) : (
        <Typography variant="h6" color="error" align="center">
          No tienes un tarjetón asignado. Espera a que comience la partida.
        </Typography>
      )}
    </Box>
  );
};

export default GameInProgress;

import { useEffect } from "react";
import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BingoCard from "../components/game/BingoCard";
import DrawnBalls from "../components/game/DrawnBalls";
import useSocket from "../hooks/useSocket";
import MarkedBalls from "../components/game/MarkedBalls";
import { setDrawnNumber, setMarkedNumber } from "../store/slices/gameSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";
import { setError, clearError } from "../store/slices/requestStatusSlice";
import GameTitle from "../components/game/GameTitle";
import BingoButton from "../components/game/BingoButton";

const GameInProgress = () => {
  const userId = useSelector((state) => state.auth.userId);
  const currentGame = useSelector((state) => state.game.currentGame);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );
  const error = useSelector((state) => state.requestStatus.error);

  const dispatch = useDispatch();

  console.log(currentGame);

  const player = currentGame.players.find((player) => player.userId === userId);

  const { drawBall, markBall } = useSocket({
    onBallDrawn: (newBall) => {
      dispatch(setDrawnNumber(newBall));
    },
    onBallMarked: (ballNumber) => {
      console.log("onBallMarked", ballNumber);

      dispatch(setMarkedNumber({ ballNumber, userId })); // Marca la bola en el tarjetón
      dispatch(
        setSuccessMessage({
          message: `¡Bola ${ballNumber} marcada!`,
          messageType: "success",
        })
      );
    },
    onError: (err) => {
      dispatch(setError(err.message || "Ocurrió un error inesperado."));
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    },
  });

  const handleMarkBall = async (ballNumber) => {
    await markBall(currentGame._id, userId, ballNumber); // Marca la bola
  };

  useEffect(() => {
    if (currentGame.drawnBalls.length < 75) {
      const interval = setInterval(() => {
        drawBall(currentGame._id); // Llama a la función para extraer una nueva bola
      }, 3000); // Ajusta el intervalo según sea necesario
      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [drawBall, currentGame._id]);

  const handleCloseSnackbar = () => {
    dispatch(clearSuccessMessage()); // Limpia el mensaje de éxito
  };

  // Validar messageType antes de usarlo en Alert
  const validMessageTypes = ["success", "info", "warning", "error"];
  const severity = validMessageTypes.includes(messageType)
    ? messageType
    : "info";

  return (
    <Box p={3}>
      <Box mb={3} flexDirection="row" justifyContent="space-around">
        <GameTitle title="Partida en Curso" />
        <BingoButton />
      </Box>
      <Grid container spacing={3}>
        <Grid justifyContent="space-around" item xs={12} md={6}>
          {/* Bolas Extraídas */}
          <DrawnBalls drawnBalls={currentGame.drawnBalls} />

          {/* Bolas Marcadas */}
          {player && player.markedBalls.length > 0 && (
            <MarkedBalls markedBalls={player.markedBalls} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Tarjeta de Bingo */}
          {player ? (
            <>
              <BingoCard
                card={player.card}
                markedBalls={player.markedBalls.flat()}
                onMarkBall={handleMarkBall}
              />
              {error && (
                <Typography variant="h6" color="error" align="center">
                  {error}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="h6" color="error" align="center">
              No tienes un tarjetón asignado. Espera a que comience la partida.
            </Typography>
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GameInProgress;

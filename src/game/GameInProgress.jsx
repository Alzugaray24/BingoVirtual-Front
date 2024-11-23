import { useEffect } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BingoCard from "../components/game/BingoCard";
import DrawnBalls from "../components/game/DrawnBalls";
import useSocket from "../hooks/useSocket";
import { setDrawnNumber } from "../store/slices/gameSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";
import { setMarkedNumber } from "../store/slices/gameSlice";
import { setError } from "../store/slices/requestStatusSlice";
import { clearError } from "../store/slices/requestStatusSlice";

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
      if (newBall) {
        dispatch(setDrawnNumber(newBall)); // Agrega la nueva bola extraída al estado
      }
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
      }, 100); // Ajusta el intervalo según sea necesario
      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [drawBall, currentGame._id, currentGame.drawnBalls.length]);

  const handleCloseSnackbar = () => {
    dispatch(clearSuccessMessage()); // Limpia el mensaje de éxito
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Partida en Curso
      </Typography>

      {/* Bolas Extraídas */}
      <DrawnBalls drawnBalls={currentGame.drawnBalls} />

      {/* Bolas Marcadas */}
      {player && player.markedBalls.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" mb={2}>
            Bolas Marcadas:{" "}
            {player.markedBalls.length > 0
              ? player.markedBalls.join(", ")
              : "Ninguna"}
          </Typography>
        </Box>
      )}

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

      {/* Notificación */}
      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={messageType || "info"}
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default GameInProgress;

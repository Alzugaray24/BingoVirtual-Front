import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BingoCard from "../components/game/BingoCard";
import DrawnBalls from "../components/game/DrawnBalls";
import useSocket from "../hooks/useSocket";
import MarkedBalls from "../components/game/MarkedBalls";
import {
  setDrawnNumber,
  setMarkedNumber,
  setGameWithoutPlayer,
} from "../store/slices/gameSlice";
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

  console.log(currentGame.players.length);

  const error = useSelector((state) => state.requestStatus.error);

  const dispatch = useDispatch();
  const player = currentGame.players.find((player) => player.userId === userId);
  const navigate = useNavigate();

  const { drawBall, markBall, checkWinCondition } = useSocket({
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
    onGameWon: (winner) => {
      console.log("onGameWon", winner);
      dispatch(
        setSuccessMessage({
          message: `¡Bingo! El ganador es ${winner.name}.`,
          messageType: "success",
        })
      );
    },
    onPlayerRemoved: (obj) => {
      dispatch(setGameWithoutPlayer(obj.playerId));

      dispatch(
        setSuccessMessage({
          message: "Fuiste descalificado por hacer trampa.",
          messageType: "error",
        })
      );

      // Opcional: redirigir al usuario a la pantalla de inicio después de un tiempo
      setTimeout(() => {
        navigate("/home"); // Asegúrate de usar `useNavigate` de React Router
      }, 3000); // Espera 3 segundos para que el mensaje sea visible
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
      }, 10000); // Ajusta el intervalo según sea necesario
      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [drawBall, currentGame._id]);

  const handleCloseSnackbar = () => {
    dispatch(clearSuccessMessage()); // Limpia el mensaje de éxito
  };

  const handleGameWon = async () => {
    await checkWinCondition(currentGame._id, userId);
  };

  // Validar messageType antes de usarlo en Alert
  const validMessageTypes = ["success", "info", "warning", "error"];
  const severity = validMessageTypes.includes(messageType)
    ? messageType
    : "info";

  return (
    <Box p={3}>
      <Box
        mb={3}
        flexDirection="row"
        display="flex"
        justifyContent="space-around"
      >
        <GameTitle title="Partida en Curso" />
        <BingoButton onClick={handleGameWon} />
      </Box>
      <Grid container spacing={3}>
        <Grid
          justifyContent="space-around"
          display="flex"
          flexDirection="column"
          item
          xs={12}
          md={6}
        >
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

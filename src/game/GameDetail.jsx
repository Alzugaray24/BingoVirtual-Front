import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { setError } from "../store/slices/requestStatusSlice";
import { clearSuccessMessage } from "../store/slices/successMessageSlice";
import useSocket from "../hooks/useSocket";
import SuccessMessage from "../components/game/SuccessMessage";
import ErrorMessage from "../components/game/ErrorMessage";
import GameInProgress from "./GameInProgress";
import { setCurrentGameStatus } from "../store/slices/gameSlice";
import { setSuccessMessage } from "../store/slices/successMessageSlice";

const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentGame } = useSelector((state) => state.game);
  const { loading, error } = useSelector((state) => state.requestStatus);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );

  const { startGame } = useSocket({
    onGameStarted: () => {
      dispatch(setCurrentGameStatus("En Curso"));
      dispatch(
        setSuccessMessage({
          message: "La partida ha comenzado. ¡Buena suerte!",
          messageType: "success",
        })
      );
    },
    onError: (err) => {
      dispatch(setError(err.message || "Ocurrió un error inesperado."));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
    },
  });

  useEffect(() => {
    if (!currentGame) {
      console.error("No hay un juego seleccionado.");
      navigate("/");
    }
  }, [currentGame, navigate]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, dispatch]);

  const handleStartGame = () => {
    startGame(currentGame._id); // Inicia el juego
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentGame) {
    return (
      <Box p={3}>
        <Typography variant="h5">No hay un juego seleccionado.</Typography>
      </Box>
    );
  }

  return (
    <>
      {currentGame.gameStatus === "En Curso" ? (
        <Box p={3}>
          <SuccessMessage message={successMessage} messageType={messageType} />
          <GameInProgress />
        </Box>
      ) : (
        <Box p={3}>
          <Typography variant="h4" mb={3}>
            Detalles del Juego
          </Typography>

          {/* Mensajes de éxito y error */}
          <SuccessMessage message={successMessage} messageType={messageType} />
          <ErrorMessage error={error} />

          <Typography variant="h6" mb={2}>
            Jugadores en la partida: {currentGame.players.length}
          </Typography>

          {/* Lista de jugadores */}
          <Grid container spacing={2}>
            {currentGame.players.map((player, index) => (
              <Grid item xs={12} key={player.userId._id || player.userId}>
                <Typography variant="body1">
                  {index + 1}. ID del Jugador:{" "}
                  {player.userId._id || player.userId}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Botón para iniciar el juego */}
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartGame}
            >
              Iniciar Juego
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GameDetail;

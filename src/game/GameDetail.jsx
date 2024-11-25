import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Card } from "@mui/material";
import { setError, clearError } from "../store/slices/requestStatusSlice";
import { setCurrentGameStatus } from "../store/slices/gameSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";
import useSocket from "../hooks/useSocket";
import SuccessMessage from "../components/game/SuccessMessage";
import ErrorMessage from "../components/game/ErrorMessage";
import GameDetails from "../components/game/GameDetails";
import CustomButton from "../components/game/CustomButton";
import GameInProgress from "./GameInProgress";
import GameTitle from "../components/game/GameTitle";
import { setCurrentGame } from "../store/slices/gameSlice";

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
    onPlayerJoined: (updatedGame) => {
      console.log("Jugador se unió, juego actualizado: ", updatedGame);
      dispatch(setCurrentGame(updatedGame));
      dispatch(
        setSuccessMessage({
          message: `Un nuevo jugador se ha unido a la partida.`,
          messageType: "success",
        })
      );
      dispatch(clearSuccessMessage());
    },
    onError: (err) => {
      dispatch(setError(err.message || "Ocurrió un error inesperado."));
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    },
  });

  useEffect(() => {
    if (!currentGame) {
      navigate("/");
    }
  }, [currentGame, navigate]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, dispatch]);

  const handleStartGame = () => {
    startGame(currentGame._id);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentGame) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="textSecondary">
          No hay un juego seleccionado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {successMessage && (
        <SuccessMessage message={successMessage} messageType={messageType} />
      )}
      {error && <ErrorMessage error={error} />}

      {currentGame.gameStatus === "En Curso" ? (
        <GameInProgress />
      ) : (
        <Box>
          <Box mb={3}>
            <GameTitle title="Detalles del Juego" />
          </Box>
          <Box>
            <Card
              sx={{
                width: "100%",
                maxWidth: "800px",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <GameDetails game={currentGame} />
              <Box mt={4} textAlign="center">
                <CustomButton
                  text="Iniciar Juego"
                  color="primary"
                  size="large"
                  onClick={handleStartGame}
                  sx={{
                    backgroundColor: "#007bff",
                    "&:hover": { backgroundColor: "#0056b3" },
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Card>
          </Box>{" "}
        </Box>
      )}
    </Box>
  );
};

export default GameDetail;

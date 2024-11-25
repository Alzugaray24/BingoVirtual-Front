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
import { openModal, closeModal } from "../store/slices/modalSlice"; // Importar modalSlice
import GameTitle from "../components/game/GameTitle";
import BingoButton from "../components/game/BingoButton";
import CustomModal from "../components/game/CustomModal"; // Importar CustomModal

const GameInProgress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);
  const currentGame = useSelector((state) => state.game.currentGame);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );
  const { isOpen, type, content } = useSelector((state) => state.modal);

  const error = useSelector((state) => state.requestStatus.error);

  const player = currentGame.players.find((player) => player.userId === userId);

  const { drawBall, markBall, checkWinCondition } = useSocket({
    onBallDrawn: (newBall) => {
      dispatch(setDrawnNumber(newBall));
    },
    onBallMarked: (ballNumber) => {
      dispatch(setMarkedNumber({ ballNumber, userId }));
      dispatch(
        setSuccessMessage({
          message: `¡Bola ${ballNumber} marcada!`,
          messageType: "success",
        })
      );
    },
    onGameWon: (winner) => {
      if (winner.winner) {
        console.log(winner.winner);

        dispatch(
          setSuccessMessage({
            message: `¡Bingo! El ganador es ${winner.playerId}.`,
            messageType: "success",
          })
        );
        setTimeout(() => {
          dispatch(clearSuccessMessage());
          navigate("/home");
        }, 3000);
      }
    },
    onPlayerRemoved: (obj) => {
      dispatch(setGameWithoutPlayer(obj.playerId));
      dispatch(
        setSuccessMessage({
          message: "Fuiste descalificado por hacer trampa.",
          messageType: "error",
        })
      );
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    },
    onRedirectToHome: () => {
      navigate("/home");
    },
    onError: (err) => {
      dispatch(setError(err.message || "Ocurrió un error inesperado."));
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    },
  });

  const handleMarkBall = async (ballNumber) => {
    await markBall(currentGame._id, userId, ballNumber);
  };

  const handleGameWon = async () => {
    await checkWinCondition(currentGame._id, userId);
    dispatch(closeModal());
  };

  const handleOpenModal = () => {
    dispatch(
      openModal({
        type: "confirm",
        content: {
          message:
            "¿Estás seguro de que quieres declarar Bingo? Si no es correcto, serás descalificado.",
          onConfirm: handleGameWon,
          onCancel: () => dispatch(closeModal()),
        },
      })
    );
  };

  useEffect(() => {
    if (currentGame.drawnBalls.length < 75) {
      const interval = setInterval(() => {
        drawBall(currentGame._id);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [drawBall, currentGame._id, currentGame.drawnBalls.length]);

  const handleCloseSnackbar = () => {
    dispatch(clearSuccessMessage());
  };

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
        <BingoButton onClick={handleOpenModal} />
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
          <DrawnBalls drawnBalls={currentGame.drawnBalls} />
          {player && player.markedBalls.length > 0 && (
            <MarkedBalls markedBalls={player.markedBalls} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
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
      <CustomModal
        isOpen={isOpen}
        type={type}
        message={content?.message}
        onConfirm={content?.onConfirm}
        onCancel={content?.onCancel}
      />
    </Box>
  );
};

export default GameInProgress;

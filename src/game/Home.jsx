import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setGames,
  addGame,
  deleteGame,
  setCurrentGame,
} from "../store/slices/gameSlice";
import { setError } from "../store/slices/requestStatusSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";
import useSocket from "../hooks/useSocket";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import GameList from "../components/game/GameList";
import CurrentGame from "../components/game/CurrentGame";
import SuccessMessage from "../components/game/SuccessMessage";
import ErrorMessage from "../components/game/ErrorMessage";
import clearError from "../store/slices/requestStatusSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { games, currentGame } = useSelector((state) => state.game);
  const { loading, error } = useSelector((state) => state.requestStatus);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );
  const userId = useSelector((state) => state.auth.userId);

  const {
    viewGames,
    createGame,
    deleteGame: deleteGameSocket,
    joinGame,
    removePlayer,
  } = useSocket({
    onGamesList: (data) => {
      dispatch(setGames(data));
    },
    onGameCreated: (game) => {
      dispatch(addGame(game));
      dispatch(
        setSuccessMessage({
          message: "Un nuevo juego ha sido creado.",
          messageType: "success",
        })
      );
    },
    onGameDeleted: (gameId) => {
      dispatch(deleteGame(gameId));
      dispatch(
        setSuccessMessage({
          message: "El juego fue eliminado exitosamente.",
          messageType: "info",
        })
      );
    },
    onGameJoined: (game) => {
      dispatch(setCurrentGame(game));
      navigate(`/game-detail/${game._id}`);
    },
    onPlayerDisconnected: (userId) => {
      dispatch(
        setSuccessMessage({
          message: `El jugador con ID ${userId} se desconectó.`,
          messageType: "warning",
        })
      );
    },
    onPlayerRemoved: (player) => {
      dispatch(
        setSuccessMessage({
          message: `El jugador con ID ${player.userId} fue removido.`,
          messageType: "info",
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

  useEffect(() => {
    viewGames();
  }, [viewGames]);

  const handleCreateGame = () => {
    createGame();
  };

  const handleDeleteGame = (gameId) => {
    deleteGameSocket(gameId);
  };

  const handleJoinGame = (gameId, userId) => {
    if (!userId) {
      dispatch(
        setError(
          "El ID del usuario no está definido. No se puede unir al juego."
        )
      );
      return;
    }
    joinGame(gameId, userId);
  };

  const handleRemovePlayer = (gameId, userId) => {
    removePlayer(gameId, userId);
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Bingo Virtual - Inicio
      </Typography>

      <SuccessMessage message={successMessage} messageType={messageType} />
      <ErrorMessage error={error} />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      <Box mb={4}>
        <Button variant="contained" color="primary" onClick={handleCreateGame}>
          Crear Juego
        </Button>
      </Box>

      <GameList
        games={games}
        userId={userId}
        onJoinGame={handleJoinGame}
        onDeleteGame={handleDeleteGame}
        onRemovePlayer={handleRemovePlayer}
      />

      {currentGame && (
        <CurrentGame
          currentGame={currentGame}
          onLeaveGame={() => dispatch(setCurrentGame(null))}
        />
      )}
    </Box>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setGames,
  addGame,
  deleteGame,
  setCurrentGame,
} from "../store/slices/gameSlice";
import {
  setLoading,
  setError,
  clearError,
} from "../store/slices/requestStatusSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";
import useSocket from "../hooks/useSocket";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

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
    notifyDisconnect,
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

  const handleNotifyDisconnect = () => {
    if (userId) notifyDisconnect(userId);
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

      {successMessage && (
        <Typography
          sx={{ color: messageType === "success" ? "green" : "blue", mb: 2 }}
        >
          {successMessage}
        </Typography>
      )}

      {error && (
        <Typography sx={{ color: "red", mb: 2 }}>Error: {error}</Typography>
      )}

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

      <Box>
        <Typography variant="h6" mb={2}>
          Juegos Disponibles:
        </Typography>
        {games.length === 0 ? (
          <Typography>No hay juegos disponibles.</Typography>
        ) : (
          games.map((game) => (
            <Box
              key={game._id}
              sx={{
                p: 2,
                mb: 2,
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <Typography variant="body1">
                <strong>Nombre:</strong> {game.name}
              </Typography>
              <Typography variant="body2">
                <strong>Jugadores:</strong> {game.players.length}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinGame(game._id, userId)}
                >
                  Unirse
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteGame(game._id)}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemovePlayer(game._id, userId)}
                >
                  Remover Jugador
                </Button>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {currentGame && (
        <Box
          sx={{ mt: 4, p: 3, border: "1px solid #333", borderRadius: "8px" }}
        >
          <Typography variant="h5">Juego actual: {currentGame.name}</Typography>
          <Typography variant="body1">
            <strong>Jugadores:</strong> {currentGame.players.length}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(setCurrentGame(null))}
            sx={{ mt: 2 }}
          >
            Salir del Juego
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;

import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setGames,
  addGame,
  deleteGame,
  setCurrentGame,
  updateGame,
} from "../store/slices/gameSlice";
import {
  setSuccessMessage,
  clearSuccessMessage,
} from "../store/slices/successMessageSlice";
import { setError, clearError } from "../store/slices/requestStatusSlice";
import { openModal, closeModal } from "../store/slices/modalSlice";

import { CircularProgress, Box } from "@mui/material";

import useSocket from "../hooks/useSocket";

import GameList from "../components/game/GameList";
import SuccessMessage from "../components/game/SuccessMessage";
import ErrorMessage from "../components/game/ErrorMessage";
import CustomButton from "../components/game/CustomButton";
import GameTitle from "../components/game/GameTitle";
import CustomModal from "../components/game/CustomModal";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { games } = useSelector((state) => state.game);
  const { loading, error } = useSelector((state) => state.requestStatus);
  const { successMessage, messageType } = useSelector(
    (state) => state.successMessage
  );
  const userId = useSelector((state) => state.auth.userId);
  const { isOpen, content, type } = useSelector((state) => state.modal);

  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const showMessage = (message, type) => {
    console.log("Mostrando mensaje:", message, "Tipo:", type);
    dispatch(setSuccessMessage({ message, messageType: type }));
  };

  const {
    viewGames,
    createGame,
    deleteGame: deleteGameSocket,
    joinGame,
  } = useSocket({
    onGamesList: (data) => {
      console.log("Recibida lista de juegos:", data);
      dispatch(setGames(data));
    },
    onGameCreated: (game) => {
      console.log("Juego creado:", game);
      dispatch(addGame(game));
      showMessage("Un nuevo juego ha sido creado.", "success");
    },
    onGameDeleted: (gameId) => {
      console.log("Juego eliminado:", gameId);
      dispatch(deleteGame(gameId));
      showMessage("El juego fue eliminado exitosamente.", "info");
    },
    onGameJoined: (game) => {
      console.log("Juego unido:", game);
      dispatch(setCurrentGame(game));
      navigate(`/game-detail/${game._id}`);
    },
    onPlayerDisconnected: (disconnectedUserId) => {
      console.log("Jugador desconectado:", disconnectedUserId);
      showMessage(
        `El jugador con ID ${disconnectedUserId} se desconectó.`,
        "warning"
      );
    },
    onPlayerJoined: (game) => {
      console.log("Jugador se unió al juego:", game);
      dispatch(updateGame(game));
    },
    onError: (err) => {
      console.error("Error recibido:", err.message || "Ocurrió un error");
      dispatch(setError(err.message || "Ocurrió un error inesperado."));
      setTimeout(() => dispatch(clearError()), 3000);
    },
    onGameStartedAll: (gameStarted) => {
      console.log("Juego iniciado globalmente:", gameStarted);
      dispatch(updateGame(gameStarted));
    },
    onGameEndedAll: (gameEnded) => {
      console.log("Juego finalizado globalmente:", gameEnded);
      dispatch(updateGame(gameEnded));
    },
  });

  useEffect(() => {
    console.log("Cargando lista de juegos...");
    viewGames();
  }, [viewGames]);

  const handleCreateGame = useCallback(() => {
    console.log("Creando un nuevo juego...");
    createGame();
  }, [createGame]);

  const handleDeleteGame = useCallback(
    (gameId) => {
      console.log("Intentando eliminar juego con ID:", gameId);
      setOnConfirmAction(() => () => {
        console.log("Confirmando eliminación de juego con ID:", gameId);
        deleteGameSocket(gameId);
        dispatch(closeModal());
      });

      dispatch(
        openModal({
          type: "confirm",
          content: {
            message: "¿Estás seguro de que deseas eliminar este juego?",
          },
        })
      );
    },
    [dispatch, deleteGameSocket]
  );

  const handleJoinGame = useCallback(
    (gameId) => {
      if (!userId) {
        console.error("Error: ID del usuario no definido.");
        dispatch(
          setError(
            "El ID del usuario no está definido. No se puede unir al juego."
          )
        );
        return;
      }
      console.log("Uniéndose al juego con ID:", gameId, "Usuario ID:", userId);
      joinGame(gameId, userId);
    },
    [dispatch, joinGame, userId]
  );

  useEffect(() => {
    if (successMessage) {
      console.log("Mensaje de éxito recibido:", successMessage);
      const timeout = setTimeout(() => {
        console.log("Limpiando mensaje de éxito.");
        dispatch(clearSuccessMessage());
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <GameTitle title="Bingo Virtual - Inicio" />

      <Box sx={{ width: "100%", maxWidth: "600px", margin: "16px 0" }}>
        <SuccessMessage message={successMessage} messageType={messageType} />
        <ErrorMessage error={error} />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box mb={4}>
            <CustomButton
              text="Crear Juego"
              color="primary"
              onClick={handleCreateGame}
              size="large"
              borderRadius="8px"
              sx={{
                backgroundColor: "#007bff",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            />
          </Box>

          <GameList
            games={games}
            userId={userId}
            onJoinGame={handleJoinGame}
            onDeleteGame={handleDeleteGame}
          />
        </>
      )}

      <CustomModal
        isOpen={isOpen}
        type={type}
        message={content?.message}
        onConfirm={onConfirmAction}
        onCancel={() => dispatch(closeModal())}
      />
    </Box>
  );
};

export default Home;

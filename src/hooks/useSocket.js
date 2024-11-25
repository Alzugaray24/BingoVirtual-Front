import { useEffect, useCallback } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const useSocket = ({
  onGameCreated,
  onGamesList,
  onError,
  onGameDeleted,
  onGameJoined,
  onGameStarted,
  onBallDrawn,
  onBallMarked,
  onGameWon,
  onGameEnded,
  onPlayerJoined,
  onPlayerDisconnected,
  onPlayerRemoved,
  onRedirectToHome, // Nuevo evento para redirigir a los jugadores
}) => {
  useEffect(() => {
    const events = {
      gamesList: onGamesList,
      gameCreated: onGameCreated,
      gameDeleted: onGameDeleted,
      gameJoined: onGameJoined,
      gameStarted: onGameStarted,
      ballDrawn: onBallDrawn,
      ballMarked: onBallMarked,
      gameWon: onGameWon,
      gameEnded: onGameEnded,
      playerJoined: onPlayerJoined,
      playerDisconnected: onPlayerDisconnected,
      playerRemoved: onPlayerRemoved,
      redirectToHome: onRedirectToHome, // Manejo del nuevo evento
      error: onError,
    };

    Object.entries(events).forEach(([event, handler]) => {
      if (handler) socket.on(event, handler);
    });

    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        if (handler) socket.off(event, handler);
      });
    };
  }, [
    onGameCreated,
    onGamesList,
    onError,
    onGameDeleted,
    onGameJoined,
    onGameStarted,
    onBallDrawn,
    onBallMarked,
    onGameWon,
    onGameEnded,
    onPlayerJoined,
    onPlayerDisconnected,
    onPlayerRemoved,
    onRedirectToHome, // Dependencia del nuevo evento
  ]);

  const viewGames = useCallback(() => socket.emit("viewGames"), []);
  const createGame = useCallback(() => socket.emit("createGame"), []);
  const deleteGame = useCallback(
    (gameId) => socket.emit("deleteGame", gameId),
    []
  );
  const joinGame = useCallback(
    (gameId, userId) => socket.emit("joinGame", gameId, userId),
    []
  );
  const startGame = useCallback(
    (gameId) => socket.emit("startGame", gameId),
    []
  );
  const drawBall = useCallback((gameId) => socket.emit("drawBall", gameId), []);
  const markBall = useCallback(
    (gameId, userId, ballNumber) =>
      socket.emit("markBall", gameId, userId, ballNumber),
    []
  );
  const checkWinCondition = useCallback(
    (gameId, userId) => socket.emit("checkWinCondition", gameId, userId),
    []
  );
  const endGame = useCallback((gameId) => socket.emit("endGame", gameId), []);
  const notifyDisconnect = useCallback(
    (userId) => socket.emit("playerDisconnected", userId),
    []
  );
  const removePlayer = useCallback(
    (gameId, userId) => socket.emit("removePlayer", gameId, userId),
    []
  );

  return {
    viewGames,
    createGame,
    deleteGame,
    joinGame,
    startGame,
    drawBall,
    markBall,
    checkWinCondition,
    endGame,
    notifyDisconnect,
    removePlayer,
  };
};

export default useSocket;

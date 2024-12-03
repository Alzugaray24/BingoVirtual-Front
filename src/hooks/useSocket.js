import { useEffect, useCallback } from "react";
import io from "socket.io-client";

const socket = io("https://bingovirtual-back.onrender.com");

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
  onPlayerJoined,
  onPlayerDisconnected,
  onRedirectToHome,
  onGameStartedAll,
  onGameEndedAll,
  onPlayerRemoved,
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
      playerJoined: onPlayerJoined,
      playerDisconnected: onPlayerDisconnected,
      redirectToHome: onRedirectToHome,
      gameStartedAll: onGameStartedAll,
      gameEndedAll: onGameEndedAll,
      playerRemoved: onPlayerRemoved,
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
    onPlayerJoined,
    onPlayerDisconnected,
    onRedirectToHome,
    onGameStartedAll,
    onPlayerRemoved,
    onGameEndedAll,
  ]);

  // Funciones para emitir eventos al servidor
  const emitEvent = useCallback(
    (event, ...args) => socket.emit(event, ...args),
    []
  );

  const viewGames = useCallback(() => emitEvent("viewGames"), [emitEvent]);
  const createGame = useCallback(() => emitEvent("createGame"), [emitEvent]);
  const deleteGame = useCallback(
    (gameId) => emitEvent("deleteGame", gameId),
    [emitEvent]
  );
  const joinGame = useCallback(
    (gameId, userId) => emitEvent("joinGame", gameId, userId),
    [emitEvent]
  );
  const startGame = useCallback(
    (gameId) => emitEvent("startGame", gameId),
    [emitEvent]
  );
  const drawBall = useCallback(
    (gameId) => emitEvent("drawBall", gameId),
    [emitEvent]
  );
  const markBall = useCallback(
    (gameId, userId, ballNumber) =>
      emitEvent("markBall", gameId, userId, ballNumber),
    [emitEvent]
  );
  const checkWinCondition = useCallback(
    (gameId, userId) => emitEvent("checkWinCondition", gameId, userId),
    [emitEvent]
  );
  const endGame = useCallback(
    (gameId) => emitEvent("endGame", gameId),
    [emitEvent]
  );
  const notifyDisconnect = useCallback(
    (userId) => emitEvent("playerDisconnected", userId),
    [emitEvent]
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
  };
};

export default useSocket;

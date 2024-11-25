import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  currentGame: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    resetGames: (state) => {
      state.games = [];
    },
    addGame: (state, action) => {
      state.games.push(action.payload);
    },
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setCurrentGameStatus: (state, action) => {
      state.currentGame.gameStatus = action.payload;
    },
    setDrawnNumber: (state, action) => {
      console.log(action.payload);

      state.currentGame.drawnBalls.push(action.payload);
    },
    setMarkedNumber: (state, action) => {
      console.log("setMarkedNumber", action.payload);
      console.log(action.payload.userId);
      console.log(action.payload.ballNumber);

      const player = state.currentGame.players.find(
        (player) => player.userId === action.payload.userId
      );

      console.log(player);

      player.markedBalls.push(action.payload.ballNumber);
    },
    setPlayers: (state, action) => {
      const { gameId, newPlayer } = action.payload;

      // Verifica si el gameId coincide con el currentGame
      if (state.currentGame && state.currentGame._id === gameId) {
        // Agrega el nuevo jugador a la lista de jugadores
        state.currentGame.players = [...state.currentGame.players, newPlayer];
      }

      console.log("jugador agregado ", state.currentGame);
    },
    setGameWithoutPlayer: (state, action) => {
      const playerId = action.payload;
      state.currentGame.players = state.currentGame.players.filter(
        (player) => player.userId !== playerId
      );
      console.log("Player Removed");
    },
    deleteGame: (state, action) => {
      state.games = state.games.filter((game) => game._id !== action.payload);
    },
  },
});

export const {
  setGames,
  setCurrentGame,
  resetGames,
  addGame,
  deleteGame,
  setCurrentGameStatus,
  setDrawnNumber,
  setMarkedNumber,
  setGameWithoutPlayer,
  setPlayers,
} = gameSlice.actions;

export default gameSlice.reducer;

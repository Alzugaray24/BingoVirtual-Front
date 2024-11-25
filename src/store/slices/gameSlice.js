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
      state.currentGame.drawnBalls.push(action.payload);
    },
    setMarkedNumber: (state, action) => {
      const { userId, ballNumber } = action.payload;
      const player = state.currentGame.players.find((p) => p.userId === userId);

      if (player) {
        // Solo agrega la bola si no está ya marcada
        if (!player.markedBalls.includes(ballNumber)) {
          player.markedBalls.push(ballNumber);
        }
      }
    },
    setGameWithoutPlayer: (state, action) => {
      const playerId = action.payload;
      state.currentGame.players = state.currentGame.players.filter(
        (player) => player.userId !== playerId
      );
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
} = gameSlice.actions;

export default gameSlice.reducer;

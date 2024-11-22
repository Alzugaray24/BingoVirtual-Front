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
      console.log("entre");

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
} = gameSlice.actions;

export default gameSlice.reducer;

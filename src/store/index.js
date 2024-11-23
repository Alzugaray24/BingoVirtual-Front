import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import gameReducer from "./slices/gameSlice";
import authReducer from "./slices/authSlice";
import requestStatusReducer from "./slices/requestStatusSlice";
import successMessageReducer from "./slices/successMessageSlice";
import socketReducer from "./slices/socketSlice";
import modalReducer from "./slices/modalSlice"; // Importar modalReducer

const gamePersistConfig = {
  key: "game",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const socketPersistConfig = {
  key: "socket",
  storage,
};

const store = configureStore({
  reducer: {
    game: persistReducer(gamePersistConfig, gameReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    socket: persistReducer(socketPersistConfig, socketReducer),
    requestStatus: requestStatusReducer,
    successMessage: successMessageReducer,
    modal: modalReducer, // Agregar el reducer de modal
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { persistor };
export default store;

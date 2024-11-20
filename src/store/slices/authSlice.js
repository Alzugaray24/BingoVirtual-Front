import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    userId: null,
    isAuthenticated: false,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;

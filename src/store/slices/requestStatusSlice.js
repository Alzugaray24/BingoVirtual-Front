import { createSlice } from "@reduxjs/toolkit";

const requestStatusSlice = createSlice({
  name: "requestStatus",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError } = requestStatusSlice.actions;
export default requestStatusSlice.reducer;

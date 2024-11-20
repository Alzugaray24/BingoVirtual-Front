import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMessage: null,
  messageType: null,
};

const successMessageSlice = createSlice({
  name: "successMessage",
  initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload.message;
      state.messageType = action.payload.messageType;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
      state.messageType = null;
    },
  },
});

export const { setSuccessMessage, clearSuccessMessage } =
  successMessageSlice.actions;

export default successMessageSlice.reducer;

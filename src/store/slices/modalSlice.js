import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false, // Estado del modal (abierto o cerrado)
    content: null, // Contenido dinámico del modal
    type: null, // Tipo de modal (opcional, ej: "confirm", "info")
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content || null;
      state.type = action.payload.type || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

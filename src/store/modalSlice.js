import { createSlice } from "@reduxjs/toolkit";

const modalReducer = createSlice({
  name: "modalReducer",
  initialState: {
    openModal: false,
  },
  reducers: {
    openModalFunc: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const { openModalFunc } = modalReducer.actions;
export default modalReducer;

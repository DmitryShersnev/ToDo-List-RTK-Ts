import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  inputError: boolean;
};

const initialState: InitialStateType = {
  inputError: false,
};

const inputErrorSlice = createSlice({
  name: "inputError",
  initialState,
  reducers: {
    setInputError: (state) => {
      state.inputError = true;
    },
    clearInputError: (state) => {
      state.inputError = false;
    },
  },
  selectors: {
    selectInputError: (state) => state.inputError,
  },
});

export const { setInputError, clearInputError } = inputErrorSlice.actions;
export default inputErrorSlice.reducer;
export const { selectInputError } = inputErrorSlice.selectors;

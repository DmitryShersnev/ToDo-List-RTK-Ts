import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  inputText: string;
};

const initialState: InitialStateType = {
  inputText: "",
};

const inputTextSlice = createSlice({
  name: "inputText",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },
    clearInput: (state) => {
      state.inputText = "";
    },
  },
  selectors: {
    selectInputText: (state) => state.inputText,
  },
});

export const { change, clearInput } = inputTextSlice.actions;
export default inputTextSlice.reducer;
export const { selectInputText } = inputTextSlice.selectors;

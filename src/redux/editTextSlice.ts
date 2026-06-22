import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  editText: string;
};

const initialState: InitialStateType = {
  editText: "",
};

const editTextSlice = createSlice({
  name: "editText",
  initialState,
  reducers: {
    initEditText: (state, action: PayloadAction<string>) => {
      state.editText = action.payload;
    },
    changeEditText: (state, action: PayloadAction<string>) => {
      state.editText = action.payload;
    },
  },
  selectors: {
    selectEditText: (state) => state.editText,
  },
});

export const { initEditText, changeEditText } = editTextSlice.actions;
export default editTextSlice.reducer;
export const { selectEditText } = editTextSlice.selectors;

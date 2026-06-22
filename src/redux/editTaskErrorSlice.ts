import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  errorTaskId: null | number;
};

const initialState: InitialStateType = {
  errorTaskId: null,
};

const editTaskErrorSlice = createSlice({
  name: "errorTaskId",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<number>) => {
      state.errorTaskId = action.payload;
    },
    clearError: (state) => {
      state.errorTaskId = null;
    },
  },
  selectors: {
    selectErrorTaskId: (state) => state.errorTaskId,
  },
});

export const { setError, clearError } = editTaskErrorSlice.actions;
export default editTaskErrorSlice.reducer;
export const { selectErrorTaskId } = editTaskErrorSlice.selectors;

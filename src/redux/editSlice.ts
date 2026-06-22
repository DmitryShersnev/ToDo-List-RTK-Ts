import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  editTaskId: null | number;
};

const initialState: InitialStateType = {
  editTaskId: null,
};

const editSlice = createSlice({
  name: "editTaskId",
  initialState,
  reducers: {
    startEdit: (state, action: PayloadAction<number>) => {
      state.editTaskId = action.payload;
    },
    stopEdit: (state) => {
      state.editTaskId = null;
    },
  },
  selectors: {
    selectEditTaskId: (state) => state.editTaskId,
  },
});

export const { startEdit, stopEdit } = editSlice.actions;
export default editSlice.reducer;
export const { selectEditTaskId } = editSlice.selectors;

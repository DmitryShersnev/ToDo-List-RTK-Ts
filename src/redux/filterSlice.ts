import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  filter: string;
};

const initialState: InitialStateType = {
  filter: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    all: (state) => {
      state.filter = "all";
    },
    active: (state) => {
      state.filter = "active";
    },
    done: (state) => {
      state.filter = "done";
    },
  },
  selectors: {
    selectFilter: (state) => state.filter,
  },
});

export const { all, active, done } = filterSlice.actions;
export default filterSlice.reducer;
export const { selectFilter } = filterSlice.selectors;

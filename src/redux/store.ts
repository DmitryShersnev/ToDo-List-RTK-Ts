import { configureStore } from "@reduxjs/toolkit";

import inputTextReducer from "./inputTextSlice";
import inputErrorReducer from "./inputErrorSlice";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice";
import editReducer from "./editSlice";
import editTaskErrorReducer from "./editTaskErrorSlice";
import editTextReducer from "./editTextSlice";
import regLogReducer from "./regLogSlice";

const store = configureStore({
  reducer: {
    inputText: inputTextReducer,
    tasks: tasksReducer,
    inputError: inputErrorReducer,
    filter: filterReducer,
    editTaskId: editReducer,
    errorTaskId: editTaskErrorReducer,
    editText: editTextReducer,
    regLog: regLogReducer,
  },
});
export default store;

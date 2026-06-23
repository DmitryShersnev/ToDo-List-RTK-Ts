import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./hooks/hooks";

type TokenType = string | null;

type TaskType = {
  completed: boolean;
  createdAt: string;
  description: null;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
};
type InitialStateType = {
  tasks: TaskType[];
  loading: boolean;
};

const initialState: InitialStateType = {
  tasks: [],
  loading: false,
};

const apiUrl = import.meta.env.VITE_API_URL;

export const getTasks = createAppAsyncThunk<
  { data: TaskType[]; meta: {} },
  void
>("tasks/getTasks", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const token: TokenType = localStorage.getItem("token");

  try {
    const response = await fetch(`${apiUrl}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return rejectWithValue(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    const error = e as { message: string };
    console.log(rejectWithValue(error.message));
  }
});

export const createTask = createAppAsyncThunk<TaskType, string>(
  "tasks/createTask",
  async (task, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token: TokenType = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: task }),
      });
      if (!response.ok) {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      const error = e as { message: string };
      console.log(rejectWithValue(error.message));
    }
  },
);

export const deleteTask = createAppAsyncThunk<number | undefined, number>(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token: TokenType = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
      return id;
    } catch (e) {
      const error = e as { message: string };
      console.log(rejectWithValue(error.message));
    }
  },
);

export const changeCheckbox = createAppAsyncThunk<TaskType, number>(
  "tasks/changeCheckbox",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token: TokenType = localStorage.getItem("token");

    try {
      const response = await fetch(`${apiUrl}/api/todos/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (e) {
      const error = e as { message: string };
      console.log(rejectWithValue(error.message));
    }
  },
);

export const deleteDoneTasks = createAppAsyncThunk<number[], void>(
  "tasks/deleteDoneTasks",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const token: TokenType = localStorage.getItem("token");
    try {
      const state = getState();
      const completedTasks = state.tasks.tasks.filter((item) => item.completed);

      const responses = await Promise.all(
        completedTasks.map((item) =>
          fetch(`${apiUrl}/api/todos/${item.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );
      for (const response of responses) {
        if (!response.ok) {
          return rejectWithValue(`HTTP error: ${response.status}`);
        }
      }
      const deletedIds = completedTasks.map((item) => item.id);
      return deletedIds;
    } catch (e) {
      const error = e as { message: string };
      return rejectWithValue(error.message);
    }
  },
);

export const updateTask = createAppAsyncThunk<TaskType, [number, string]>(
  "tasks/updateTask",
  async ([id, newTitle], thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const token: TokenType = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!response.ok) {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      const error = e as { message: string };
      console.log(rejectWithValue(error.message));
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  selectors: {
    selectTasks: (state) => state.tasks,
    selectLoading: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<{ data: TaskType[]; meta: {} }>) => {
          state.tasks = action.payload.data;
          state.loading = false;
        },
      )

      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.tasks.push(action.payload);
          state.loading = false;
        },
      )

      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<number | undefined>) => {
          state.tasks = state.tasks.filter(
            (item) => item.id !== action.payload,
          );
          state.loading = false;
        },
      )
      .addCase(
        changeCheckbox.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.tasks = state.tasks.map((item) =>
            item.id === action.payload.id
              ? { ...item, completed: !item.completed }
              : item,
          );
          state.loading = false;
        },
      )
      .addCase(
        deleteDoneTasks.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          const deletedIds = action.payload;
          state.tasks = state.tasks.filter(
            (item) => !deletedIds.includes(item.id),
          );
          state.loading = false;
        },
      )
      .addCase(
        updateTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.tasks = state.tasks.map((item) =>
            item.id === action.payload.id
              ? { ...item, title: action.payload.title }
              : item,
          );
          state.loading = false;
        },
      );
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.loading = false;

        // state.error = action.payload || action.error.message;
      },
    );
  },
});

export default tasksSlice.reducer;
export const { selectTasks, selectLoading } = tasksSlice.selectors;

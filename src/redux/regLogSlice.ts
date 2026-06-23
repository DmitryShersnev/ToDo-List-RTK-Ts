import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./hooks/hooks";

const initialState = {};

export type LogDataType = {
  email: string;
  password: string;
};

export type RegDataType = {
  username: "";
  email: "";
  password: "";
  gender: "";
  age: "";
};

const apiUrl = import.meta.env.VITE_API_URL;

export const login = createAppAsyncThunk<{ access_token: string }, LogDataType>(
  "tasks/login",
  async (loginData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        return data;
      } else {
        return rejectWithValue(`HTTP error: ${response.status}`);
      }
    } catch (e) {
      const error = e as { message: string };
      console.log(rejectWithValue(error.message));
    }
  },
);

export const registration = createAppAsyncThunk<
  { access_token: string },
  RegDataType
>("tasks/registration", async (regData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regData),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(`HTTP error: ${response.status}`);
    } else {
      return data;
    }
  } catch (e) {
    const error = e as { message: string };
    console.log(rejectWithValue(error.message));
  }
});

const regLogSlice = createSlice({
  name: "regLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      login.rejected,
      (_, action: PayloadAction<string | null | undefined>) => {
        alert(action.payload);
      },
    );
    builder
      .addCase(registration.fulfilled, () => {
        alert("Вы успешно зарегистрировались. Теперь нужно залогиниться");
      })
      .addCase(
        registration.rejected,
        (_, action: PayloadAction<string | null | undefined>) => {
          alert(action.payload);
        },
      );
  },
});

export default regLogSlice.reducer;

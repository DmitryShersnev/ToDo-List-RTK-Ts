import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

const apiUrl = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
  "tasks/login",
  async (loginData, thunkAPI) => {
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
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const registration = createAsyncThunk(
  "tasks/registration",
  async (regData, thunkAPI) => {
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
        return thunkAPI.rejectWithValue(data.message);
      } else {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const regLogSlice = createSlice({
  name: "regLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      alert(action.payload);
    });
    builder
      .addCase(registration.fulfilled, (state, action) => {
        alert("Вы успешно зарегистрировались. Теперь нужно залогиниться");
      })
      .addCase(registration.rejected, (state, action: PayloadAction<any>) => {
        alert(action.payload);
      });
  },
});

export default regLogSlice.reducer;

import * as ENV from "../config";

// Initial state
export const initialUserState = {
  user: null,
  isLoggedIn: false,
};

// Reducer function (Redux-like slice)
export function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
}

// Action creators (optional)
export const loginUser = (user) => ({ type: "LOGIN", payload: user });
export const logoutUser = () => ({ type: "LOGOUT" });
export const updateProfile = (payload) => ({ type: "UPDATE_PROFILE", payload });
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Async Thunks
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    const response = await axios.post(
      `${ENV.SERVER_URL}/registerUser`,
      userData
    );
    return response.data.user;
  }
);

export const login = createAsyncThunk("users/login", async (userData) => {
  const response = await axios.post(`${ENV.SERVER_URL}/login`, userData);
  return response.data.user;
});

export const logout = createAsyncThunk("users/logout", async () => {
  await axios.post(`${ENV.SERVER_URL}/logout`);
});

// Slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isSuccess = false;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;

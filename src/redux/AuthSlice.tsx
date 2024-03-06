import { createSlice } from "@reduxjs/toolkit";
import {
  handleLoginApi,
  handleSignUpApi,
} from "@/services/userOnboardingService";

const initialState = {
  isLoading: false,
  user: {},
  isError: {},
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleLoginApi.pending, (state, action) => {
      state.isLoading = true;
      state.user = {};
    });
    builder.addCase(handleLoginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 500) {
        state.isError = action.payload.data.message;
        state.user = {};
      } else {
        state.user = action.payload.data;
        state.isError = {};
      }
    });
    builder.addCase(handleSignUpApi.pending, (state, action) => {
      state.isLoading = true;
      state.user = {};
    });
    builder.addCase(handleSignUpApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 500) {
        state.isError = action.payload.data.message;
        state.user = {};
      } else {
        state.user = action.payload.data;
        state.isError = {};
      }
    });
  },
  reducers: {
    logout: (state) => {
      state.isError = {};
      state.isLoading = false;
      state.user = {};
    },
    resetError: (state) => {
      state.isError = {};
      state.isLoading = false;
    },
  },
});

export const { resetError, logout } = authSlice.actions;

export default authSlice.reducer;

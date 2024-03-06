import {
  handleGetPosts,
  handleGetSinglePost,
  handleSubmitPost,
} from "@/services/postService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  posts: [],
  isError: {},
  singlePost: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleGetPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetPosts.fulfilled, (state, action: any) => {
      if (action.payload.status === 200) {
        state.isLoading = false;
        state.posts = action.payload.data;
      }
    });
    builder.addCase(handleGetPosts.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(handleGetSinglePost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetSinglePost.fulfilled, (state, action) => {
      state.singlePost = action.payload.data;
      state.isLoading = true;
    });
    builder.addCase(handleGetSinglePost.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(handleSubmitPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleSubmitPost.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.posts = [action.payload.data, ...state.posts];
      }
    });
    builder.addCase(handleSubmitPost.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
  reducers: {
    resetPostError: (state) => {
      state.isError = {};
      state.isLoading = false;
    },
  },
});

export const { resetPostError } = postSlice.actions;

export default postSlice.reducer;

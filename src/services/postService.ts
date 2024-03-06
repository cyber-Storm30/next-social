import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URI, getData, postData } from "./rootService";
import axios from "axios";
axios.defaults.withCredentials = true;

interface PostData {
  userId: string;
  body: string;
  image?: string;
}
//<------------Async Thunk calls ------------->

//Posts fetch

export const handleGetPosts = createAsyncThunk("GetPosts", async () => {
  try {
    const response = await getData("/post");
    // const response = await axios.get(`${BASE_URI}/post`);
    return response;
  } catch (err) {
    return err;
  }
});

// single post fetch

export const handleGetSinglePost = createAsyncThunk(
  "GetSinglePost",
  async (postId: string) => {
    try {
      const response = await getData(`/post/single/post?postId=${postId}`);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const handleSubmitPost = createAsyncThunk(
  "CreatePost",
  async (data: PostData) => {
    try {
      const response = await postData(`/post`, {
        body: data.body,
        userId: data.userId,
        image: data.image,
      });
      return response;
    } catch (err) {
      return err;
    }
  }
);

// <--------------Normal Api calls --------------->

export const handleLikePost = async (postId: string, userId: string) => {
  try {
    const response = await postData("/like", {
      userId,
      postId,
    });
    return response;
  } catch (err) {
    return err;
  }
};

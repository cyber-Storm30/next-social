import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "./rootService";

// <------------Async Thunk calls ------------->

//user login
interface LoginData {
  router: any;
  email: string;
  password: string;
}

export const handleLoginApi = createAsyncThunk(
  "login",
  async (data: LoginData) => {
    const { router } = data;
    const response = await postData("/auth/login", {
      email: data.email,
      password: data.password,
    });
    if (response.status === 200) {
      router.push("/");
    }
    return response;
  }
);

interface SignUpData {
  router: any;
  username: string;
  email: string;
  password: string;
  image: string;
}

export const handleSignUpApi = createAsyncThunk(
  "Signup",
  async (data: SignUpData) => {
    const { router } = data;
    const response = await postData("/auth/signup", {
      username: data.username,
      email: data.email,
      password: data.password,
      image: data.image,
    });
    console.log(response);
    if (response.status === 200) {
      router.push("/");
    }
    return response;
  }
);

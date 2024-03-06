import { getData, postData } from "./rootService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleGetMessages = createAsyncThunk(
  "getMessages",
  async (chatId: string) => {
    try {
      const response = await getData(`/message/${chatId}`);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const sendMessage = async (
  sender: string,
  receiver: string,
  content: string,
  chatId: string
) => {
  try {
    const response = await postData("/message", {
      sender,
      receiver,
      content,
      chatId,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createOneToOneChat = async (
  senderId: string,
  receiverId: string
) => {
  try {
    const response = await postData("/chat", {
      senderId,
      receiverId,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getAllUserChats = async (userId: string) => {
  try {
    const response = await getData(`/chat/${userId}`);
    return response;
  } catch (err) {
    return err;
  }
};

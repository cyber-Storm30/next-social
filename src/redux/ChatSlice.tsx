import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleGetMessages } from "@/services/chatService";
import { boolean } from "zod";

interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  req_sent_to: string[];
  req_received_from: string[];
  connections: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Message {
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  chatId: string;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatState {
  isLoading: boolean;
  user: User;
  chatId: string;
  messages: Message[];
  isError: boolean;
}

const initialState: ChatState = {
  isLoading: false,
  user: {} as User,
  chatId: "",
  messages: [],
  isError: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateMessage: (state, action: PayloadAction<Message>) => {
      if (state.chatId === action.payload.chatId) {
        state.messages = [...state.messages, action.payload];
      }
    },
    selectUser: (state, action) => {
      state.user = action.payload.user;
      state.chatId = action.payload.chatId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleGetMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload.data;
    });
    builder.addCase(handleGetMessages.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { selectUser, updateMessage } = chatSlice.actions;

export default chatSlice.reducer;

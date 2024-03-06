import { handleGetMessages } from "@/services/chatService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: {},
  chatId: "",
  messages: [],
  isError: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
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
  reducers: {
    updateMessage: (state, action: PayloadAction<any>) => {
      if (state.chatId === action.payload.chatId) {
        state.messages = [...state.messages, action.payload];
      }
    },
    selectUser: (state, action) => {
      state.user = action.payload.user;
      state.chatId = action.payload.chatId;
    },
  },
});
export const { selectUser, updateMessage } = chatSlice.actions;

export default chatSlice.reducer;

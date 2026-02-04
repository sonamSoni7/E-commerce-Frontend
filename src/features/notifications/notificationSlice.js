import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

const initialState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getNotifications = createAsyncThunk(
  "notifications/get",
  async (_, thunkAPI) => {
    try {
      return await notificationService.getNotifications();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/mark-read",
  async (notificationId, thunkAPI) => {
    try {
      return await notificationService.markAsRead(notificationId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/mark-all-read",
  async (_, thunkAPI) => {
    try {
      return await notificationService.markAllAsRead();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n._id === action.meta.arg
        );
        if (index !== -1) {
          state.notifications[index].isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => (n.isRead = true));
        state.unreadCount = 0;
      });
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trackingService from "./trackingService";

const initialState = {
  currentTracking: null,
  liveLocation: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getOrderTracking = createAsyncThunk(
  "tracking/get",
  async (orderId, thunkAPI) => {
    try {
      return await trackingService.getOrderTracking(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getLiveLocation = createAsyncThunk(
  "tracking/live",
  async (orderId, thunkAPI) => {
    try {
      return await trackingService.getLiveLocation(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    updateLiveLocation: (state, action) => {
      if (state.liveLocation) {
        state.liveLocation.location = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderTracking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderTracking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTracking = action.payload.tracking;
      })
      .addCase(getLiveLocation.fulfilled, (state, action) => {
        state.liveLocation = action.payload;
      });
  },
});

export const { updateLiveLocation } = trackingSlice.actions;
export default trackingSlice.reducer;

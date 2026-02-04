import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recommendationService from "./recommendationService";

const initialState = {
  personalized: [],
  similarProducts: [],
  frequentlyBought: [],
  bestSellers: [],
  newArrivals: [],
  trending: [],
  deals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getPersonalizedRecommendations = createAsyncThunk(
  "recommendations/personalized",
  async (_, thunkAPI) => {
    try {
      return await recommendationService.getPersonalizedRecommendations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSimilarProducts = createAsyncThunk(
  "recommendations/similar",
  async (productId, thunkAPI) => {
    try {
      return await recommendationService.getSimilarProducts(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBestSellers = createAsyncThunk(
  "recommendations/best-sellers",
  async (category, thunkAPI) => {
    try {
      return await recommendationService.getBestSellers(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNewArrivals = createAsyncThunk(
  "recommendations/new-arrivals",
  async (_, thunkAPI) => {
    try {
      return await recommendationService.getNewArrivals();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTrending = createAsyncThunk(
  "recommendations/trending",
  async (_, thunkAPI) => {
    try {
      return await recommendationService.getTrending();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDeals = createAsyncThunk(
  "recommendations/deals",
  async (_, thunkAPI) => {
    try {
      return await recommendationService.getDeals();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalizedRecommendations.fulfilled, (state, action) => {
        state.personalized = action.payload.recommendations;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload.similarProducts;
      })
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload.bestSellers;
      })
      .addCase(getNewArrivals.fulfilled, (state, action) => {
        state.newArrivals = action.payload.newArrivals;
      })
      .addCase(getTrending.fulfilled, (state, action) => {
        state.trending = action.payload.trendingProducts;
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        state.deals = action.payload.deals;
      });
  },
});

export default recommendationSlice.reducer;

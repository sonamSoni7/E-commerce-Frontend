import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./searchService";

const initialState = {
  searchResults: [],
  suggestions: [],
  trending: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const searchProducts = createAsyncThunk(
  "search/products",
  async (query, thunkAPI) => {
    try {
      return await searchService.searchProducts(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSearchSuggestions = createAsyncThunk(
  "search/suggestions",
  async (query, thunkAPI) => {
    try {
      return await searchService.getSearchSuggestions(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTrendingSearches = createAsyncThunk(
  "search/trending",
  async (_, thunkAPI) => {
    try {
      return await searchService.getTrendingSearches();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const filterProducts = createAsyncThunk(
  "search/filter",
  async (filters, thunkAPI) => {
    try {
      return await searchService.filterProducts(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchResults = action.payload.products;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getSearchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload.suggestions;
      })
      .addCase(getTrendingSearches.fulfilled, (state, action) => {
        state.trending = action.payload.trending;
      })
      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.products;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

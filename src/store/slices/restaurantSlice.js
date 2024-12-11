import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { restaurants } from '../../services/api';

export const searchRestaurants = createAsyncThunk(
  'restaurants/search',
  async (params) => {
    const response = await restaurants.search(params);
    return response.data.results;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    list: [],
    loading: false,
    error: null,
    filters: {
      cuisine: '',
      price: '',
      dietary: [],
      radius: 1500
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setFilters } = restaurantSlice.actions;
export default restaurantSlice.reducer;

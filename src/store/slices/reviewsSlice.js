import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchReviews = createAsyncThunk(
  'reviews/fetch',
  async (restaurantId) => {
    const response = await api.get(`/reviews/${restaurantId}`);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  'reviews/add',
  async ({ restaurantId, review }) => {
    const response = await api.post(`/reviews/${restaurantId}`, review);
    return response.data;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.items[action.meta.arg] = action.payload;
        state.loading = false;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { restaurantId } = action.meta.arg;
        if (!state.items[restaurantId]) {
          state.items[restaurantId] = [];
        }
        state.items[restaurantId].unshift(action.payload);
      });
  }
});

export default reviewsSlice.reducer;

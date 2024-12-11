import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const savePreferences = createAsyncThunk(
  'preferences/save',
  async (preferences) => {
    const response = await api.post('/preferences', preferences);
    return response.data;
  }
);

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    dietary: [],
    favoriteCuisines: [],
    priceRange: [],
    savedRestaurants: [],
    loading: false,
    error: null
  },
  reducers: {
    updatePreferences: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePreferences.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updatePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;

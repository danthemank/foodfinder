import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import restaurantReducer from './slices/restaurantSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';
import groupSessionReducer from './slices/groupSessionSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantReducer,
    preferences: userPreferencesReducer,
    groupSession: groupSessionReducer,
    reviews: reviewsReducer
  },
});

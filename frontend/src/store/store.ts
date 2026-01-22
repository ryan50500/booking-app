import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import authReducer from './slices/authSlice';
import appointmentReducer from './slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    appointment: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

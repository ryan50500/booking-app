import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import authReducer from './slices/authSlice';
import applicationReducer from './slices/applicationSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

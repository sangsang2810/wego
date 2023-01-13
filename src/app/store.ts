import { configureStore } from '@reduxjs/toolkit';
import TripReducer from '../services/Slices/TripSlice';
import AuthReducer from '../services/Slices/AuthSlice';

export const store = configureStore({
  reducer: {
    trips: TripReducer,
    user: AuthReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

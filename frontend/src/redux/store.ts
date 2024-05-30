import { configureStore } from '@reduxjs/toolkit';
import { notesApi, authApi } from './slice';
export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      notesApi.middleware,
      authApi.middleware
    );
  },
});

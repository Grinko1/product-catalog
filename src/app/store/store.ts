import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../services/products/productsApi';
import { categoriesApi } from '../../services/categories/categoriesApi';
import { authApi } from '../../services/auth/authApi';
import authReducer from 'features/user/authSlice';
import productsReducer from 'features/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      categoriesApi.middleware,
      authApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

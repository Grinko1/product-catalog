import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from 'utills/cookieReader';

const initialState = {
  isAuth: false,
  loading:false
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.loading = true
      const token = getCookie('token');
      if (token?.length) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
      state.loading = false
    },
    logout: (state) => {
      state.isAuth = false;
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
  },
});

export const { checkAuth, logout } = authSlice.actions;
export default authSlice.reducer;

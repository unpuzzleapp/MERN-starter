/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    data: {},
  },
  reducers: {
    login: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    register: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('role', action.payload.data.role);
      return {
        ...state,
        data: action.payload.data,
        isSuccess: true,
        isFailed: false,
        isLoading: false,
      };
    },
    loginFailed: (state) => {
      return {
        ...state,
        isSuccess: false,
        isFailed: true,
        isLoading: false,
      };
    },
  },
});

export const { login, loginFailed, loginSuccess, register } =
  loginSlice.actions;

export default loginSlice.reducer;

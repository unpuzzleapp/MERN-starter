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
    loginSuccess: (state, action) => {
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

export const { login, loginFailed, loginSuccess } = loginSlice.actions;

export default loginSlice.reducer;

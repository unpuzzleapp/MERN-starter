/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const UISlice = createSlice({
  name: 'UI',
  initialState: {
    loading: false,
    errors: null,
  },
  reducers: {
    setError: (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    },
    clearError: (state) => {
      return {
        ...state,
        loading: false,
        errors: null,
      };
    },
    loadingUI: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    stopLoadingUI: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const { setError, clearError, loadingUI, stopLoadingUI } =
  UISlice.actions;

export default UISlice.reducer;

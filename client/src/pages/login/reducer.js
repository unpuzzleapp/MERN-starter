/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    },
    loadingUser: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    likePuzzlePiece: (state, action) => {
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            puzzlepieceId: action.payload.puzzlepieceId,
          },
        ],
      };
    },
    unLikePuzzlePiece: (state, action) => {
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.puzzlepieceId !== action.payload.puzzlepieceId,
        ),
      };
    },
    markNotificationRead: (state) => {
      state.notifications.forEach((notification) => (notification.read = true));
      return {
        ...state,
      };
    },
  },
});

export const {
  setUser,
  loadingUser,
  likePuzzlePiece,
  unLikePuzzlePiece,
  markNotificationRead,
} = loginSlice.actions;

export default loginSlice.reducer;

/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    puzzlepieces: [],
    puzzlepiece: {},
    loading: false,
  },
  reducers: {
    loadingData: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    setPuzzlePieces: (state, action) => {
      return {
        ...state,
        puzzlepieces: action.payload,
        loading: false,
      };
    },
    likePuzzlePiece: (state, action) => {
      const index = state.puzzlepieces.findIndex(
        (puzzlepiece) =>
          puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId,
      );
      state.puzzlepieces[index] = action.payload;
      if (state.puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId) {
        state.puzzlepiece = action.payload;
      }
      return {
        ...state,
      };
    },
    unLikePuzzlePiece: (state, action) => {
      const index = state.puzzlepieces.findIndex(
        (puzzlepiece) =>
          puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId,
      );
      state.puzzlepieces[index] = action.payload;
      if (state.puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId) {
        state.puzzlepiece = action.payload;
      }
      return {
        ...state,
      };
    },
    deletePuzzlePiece: (state, action) => {
      const index = state.puzzlepieces.findIndex(
        (puzzlepiece) => puzzlepiece.puzzlepieceId === action.payload,
      );
      state.puzzlepieces.splice(index, 1);
      return {
        ...state,
      };
    },
    postPuzzlePiece: (state, action) => {
      return {
        ...state,
        puzzlepieces: [action.payload, ...state.puzzlepieces],
      };
    },
    submitComment: (state, action) => {
      return {
        ...state,
        puzzlepiece: {
          ...state.puzzlepiece,
          comments: [action.payload, ...state.puzzlepiece.comments],
        },
      };
    },
  },
});

export const {
  loadingData,
  setPuzzlePieces,
  likePuzzlePiece,
  unLikePuzzlePiece,
  deletePuzzlePiece,
  postPuzzlePiece,
  submitComment,
} = puzzleSlice.actions;

export default puzzleSlice.reducer;

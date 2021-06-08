/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    puzzlepieces: [],
    puzzlepiece: {},
    loading: false,
    actionLoading: false,
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
    getPuzzlePiece: (state) => {
      return state;
    },
    setPuzzlePiece: (state, action) => {
      return {
        ...state,
        puzzlepiece: action.payload,
      };
    },
    doLike: (state) => {
      return {
        ...state,
        actionLoading: true,
      };
    },
    doUnLike: (state) => {
      return {
        ...state,
        actionLoading: true,
      };
    },
    unLikeListPuzzlePiece: (state, action) => {
      const index = state.puzzlepieces.findIndex(
        (puzzlepiece) =>
          puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId,
      );
      const latestPuzzlepieces = state.puzzlepieces.map((e, i) => {
        if (index === i) {
          return action.payload;
        }
        return e;
      });
      let currentPuzzlePiece = state.puzzlepiece;
      if (state.puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId) {
        currentPuzzlePiece = action.payload;
      }

      return {
        ...state,
        puzzlepieces: latestPuzzlepieces,
        puzzlepiece: currentPuzzlePiece,
        actionLoading: false,
      };
    },
    likeListPuzzlePiece: (state, action) => {
      const index = state.puzzlepieces.findIndex(
        (puzzlepiece) =>
          puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId,
      );
      const latestPuzzlepieces = state.puzzlepieces.map((e, i) => {
        if (index === i) {
          return action.payload;
        }
        return e;
      });
      let currentPuzzlePiece = state.puzzlepiece;
      if (state.puzzlepiece.puzzlepieceId === action.payload.puzzlepieceId) {
        currentPuzzlePiece = action.payload;
      }

      return {
        ...state,
        puzzlepieces: latestPuzzlepieces,
        puzzlepiece: currentPuzzlePiece,
        actionLoading: false,
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
  unLikeListPuzzlePiece,
  likeListPuzzlePiece,
  deletePuzzlePiece,
  postPuzzlePiece,
  submitComment,
  setPuzzlePiece,
  getPuzzlePiece,
  doLike,
  doUnLike,
} = puzzleSlice.actions;

export default puzzleSlice.reducer;

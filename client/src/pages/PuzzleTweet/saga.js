import { put } from 'redux-saga/effects';
import axios from 'axios';
import {
  setPuzzlePieces,
  setPuzzlePiece,
  likeListPuzzlePiece,
  unLikeListPuzzlePiece,
} from './reducer';
import { likePuzzlePiece, unLikePuzzlePiece } from '../login/reducer';
import { loadingUI, clearError } from '../../store/reducers/uiReducer';

const getPuzzlepieces = async (payload) => {
  const content = { ...payload };
  const data = await axios.get('/puzzlepieces', content);
  return data;
};
const getPuzzlepiece = async (payload) => {
  const data = await axios.get(`/puzzlepiece/${payload}`);
  return data;
};
function* getPuzzlePieceSaga(action) {
  try {
    yield put(loadingUI());
    const response = yield getPuzzlepiece(action.payload);
    if (response.data) {
      yield put(setPuzzlePiece(response.data));
      yield put(clearError());
    } else {
      yield put(setPuzzlePiece({}));
    }
  } catch (error) {
    yield put(setPuzzlePiece({}));
  }
}
function* getPuzzlePiecesSaga(action) {
  try {
    const response = yield getPuzzlepieces(action.payload);
    if (response.data) {
      yield put(setPuzzlePieces(response.data));
    } else {
      yield put(setPuzzlePieces([]));
    }
  } catch (error) {
    yield put(setPuzzlePieces([]));
  }
}
const likePuzzle = async (payload) => {
  const data = axios.get(`/puzzlepiece/${payload}/like`);
  return data;
};
const unLikePuzzle = async (payload) => {
  const data = axios.get(`/puzzlepiece/${payload}/unlike`);
  return data;
};
function* likePuzzlePiecesSaga(action) {
  const response = yield likePuzzle(action.payload);
  yield put(likeListPuzzlePiece(response.data));
  yield put(likePuzzlePiece(response.data));
}
function* unLikePuzzlePiecesSaga(action) {
  const response = yield unLikePuzzle(action.payload);
  yield put(unLikeListPuzzlePiece(response.data));
  yield put(unLikePuzzlePiece(response.data));
}
export {
  getPuzzlePiecesSaga,
  getPuzzlePieceSaga,
  likePuzzlePiecesSaga,
  unLikePuzzlePiecesSaga,
};
export default {};

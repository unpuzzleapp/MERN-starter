import { put } from 'redux-saga/effects';
import axios from 'axios';
import {
  setPuzzlePieces,
  setPuzzlePiece,
  likeListPuzzlePiece,
  unLikeListPuzzlePiece,
  deletePuzzlePiece,
  submitComment,
  postPuzzlePiece,
} from './reducer';
import { likePuzzlePiece, unLikePuzzlePiece } from '../login/reducer';
import {
  loadingUI,
  clearError,
  setError,
} from '../../store/reducers/uiReducer';

const getPuzzlepieces = async (payload) => {
  const content = { ...payload };
  const data = await axios.get('/puzzlepieces', content);
  return data;
};
const getPuzzlepiece = async (payload) => {
  const data = await axios.get(`/puzzlepiece/${payload}`);
  return data;
};
const likePuzzle = async (payload) => {
  const data = axios.get(`/puzzlepiece/${payload}/like`);
  return data;
};
const unLikePuzzle = async (payload) => {
  const data = axios.get(`/puzzlepiece/${payload}/unlike`);
  return data;
};
const deletePuzzle = async (payload) => {
  const data = axios.delete(`/puzzlepiece/${payload}`);
  return data;
};
const submitPuzzleComment = async (payload) => {
  const data = axios.post(`/puzzlepiece/${payload.id}/comment`, payload.data);
  return data;
};
const postPuzzle = async (payload) => {
  const data = axios.post('/puzzlepiece', payload);
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
function* postPuzzlePieceSaga(action) {
  try {
    yield put(loadingUI());
    const response = yield postPuzzle(action.payload);
    if (response.data) {
      yield put(postPuzzlePiece(response.data));
      yield put(clearError());
    } else {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError(error.message));
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
function* deletePuzzlePiecesSaga(action) {
  const response = yield deletePuzzle(action.payload);
  yield put(deletePuzzlePiece(response.data));
}
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
function* submitCommentPuzzlePiecesSaga(action) {
  const response = yield submitPuzzleComment(action.payload);
  yield put(submitComment(response.data));
  yield put(clearError());
}
export {
  getPuzzlePiecesSaga,
  getPuzzlePieceSaga,
  likePuzzlePiecesSaga,
  unLikePuzzlePiecesSaga,
  deletePuzzlePiecesSaga,
  submitCommentPuzzlePiecesSaga,
  postPuzzlePieceSaga,
};
export default {};

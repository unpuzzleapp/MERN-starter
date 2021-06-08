import { takeLatest } from 'redux-saga/effects';
import {
  login,
  register,
  getProfile,
  updateProfile,
} from '../../pages/auth/reducer';
import {
  loginSaga,
  registerSaga,
  profileSaga,
  updateProfileSaga,
} from '../../pages/auth/saga';
import { getList } from '../../pages/list/reducer';
import { listSaga } from '../../pages/list/saga';

// unpuzzle sagas and reducers
import {
  loadingUser,
  registerUser,
  getUserData,
  uploadImage,
} from '../../pages/login/reducer';
import {
  unpuzzleLoginSaga,
  unpuzzleRegisterSaga,
  unpuzzleUserData,
  unpuzzleUploadImageSaga,
} from '../../pages/login/saga';

import {
  loadingData,
  getPuzzlePiece,
  doLike,
  doUnLike,
} from '../../pages/PuzzleTweet/reducer';
import {
  getPuzzlePiecesSaga,
  getPuzzlePieceSaga,
  likePuzzlePiecesSaga,
  unLikePuzzlePiecesSaga,
} from '../../pages/PuzzleTweet/saga';

export default function* watcherSagas() {
  yield takeLatest(updateProfile.type, updateProfileSaga);
  yield takeLatest(register.type, registerSaga);
  yield takeLatest(getProfile.type, profileSaga);
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(getList.type, listSaga);

  // unpuzzle saga and reducers
  yield takeLatest(loadingUser.type, unpuzzleLoginSaga);
  yield takeLatest(registerUser.type, unpuzzleRegisterSaga);
  yield takeLatest(getUserData.type, unpuzzleUserData);
  yield takeLatest(uploadImage.type, unpuzzleUploadImageSaga);
  yield takeLatest(loadingData.type, getPuzzlePiecesSaga);
  yield takeLatest(getPuzzlePiece.type, getPuzzlePieceSaga);
  yield takeLatest(doLike.type, likePuzzlePiecesSaga);
  yield takeLatest(doUnLike.type, unLikePuzzlePiecesSaga);
}

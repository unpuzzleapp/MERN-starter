import { takeLatest } from 'redux-saga/effects';
import { changeValue } from '../../pages/login/reducer';
import changeValueSaga from '../../pages/login/saga';

export default function* watcherSagas() {
  yield takeLatest(changeValue.type, changeValueSaga);
}

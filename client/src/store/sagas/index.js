import { takeLatest } from 'redux-saga/effects';
import { login } from '../../pages/login/reducer';
import { loginSaga } from '../../pages/login/saga';
import { getList } from '../../pages/list/reducer';
import { listSaga } from '../../pages/list/saga';

export default function* watcherSagas() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(getList.type, listSaga);
}

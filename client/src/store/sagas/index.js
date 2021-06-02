import { takeLatest } from 'redux-saga/effects';
import { login, register } from '../../pages/login/reducer';
import { loginSaga, registerSaga } from '../../pages/login/saga';
import { getList } from '../../pages/list/reducer';
import { listSaga } from '../../pages/list/saga';

export default function* watcherSagas() {
  yield takeLatest(register.type, registerSaga);
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(getList.type, listSaga);
}

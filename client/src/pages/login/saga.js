import { put } from 'redux-saga/effects';
import axios from 'axios';
import { loginFailed, loginSuccess } from './reducer';

const getLogin = async (payload) => {
  const data = await axios.post(
    'http://localhost:4000/api/auth/v1/login',
    payload,
  );
  return data;
};

const getRegister = async (payload) => {
  const data = await axios.post(
    'http://localhost:4000/api/auth/v1/register',
    payload,
  );
  return data;
};

function* loginSaga(action) {
  try {
    const response = yield getLogin(action.payload);
    if (!response.error) yield put(loginSuccess(response.data));
    else yield put(loginFailed(response));
  } catch (error) {
    yield put(loginFailed({ message: error.message }));
  }
}
function* registerSaga(action) {
  try {
    const response = yield getRegister(action.payload);
    if (!response.error) yield put(loginSuccess(response.data));
    else yield put(loginFailed(response));
  } catch (error) {
    yield put(loginFailed({ message: error.message }));
  }
}
export { loginSaga, registerSaga };
export default {};

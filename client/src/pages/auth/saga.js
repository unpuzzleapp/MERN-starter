import { put } from 'redux-saga/effects';
import axios from 'axios';
import { loginFailed, loginSuccess } from './reducer';
import { LOGIN_URL, PROFILE_URL, REGISTER_URL } from '../../constant/apiRoute';

const getLogin = async (payload) => {
  const data = await axios.post(LOGIN_URL, payload);
  return data;
};

const getRegister = async (payload) => {
  const data = await axios.post(REGISTER_URL, payload);
  return data;
};

const updateProfile = async (payload) => {
  const token = localStorage.getItem('token');
  console.log({ newToken: token });
  const data = await axios.put(PROFILE_URL, payload);
  return data;
};

const getProfile = async (payload) => {
  const data = await axios.get(PROFILE_URL, payload);
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
function* profileSaga(action) {
  try {
    const response = yield getProfile(action.payload);
    if (!response.error) yield put(loginSuccess(response.data));
    else yield put(loginFailed(response));
  } catch (error) {
    yield put(loginFailed({ message: error.message }));
  }
}
function* updateProfileSaga(action) {
  try {
    const response = yield updateProfile(action.payload);
    if (!response.error) yield put(loginSuccess(response.data));
    else yield put(loginFailed(response));
  } catch (error) {
    yield put(loginFailed({ message: error.message }));
  }
}
export { loginSaga, registerSaga, profileSaga, updateProfileSaga };
export default {};

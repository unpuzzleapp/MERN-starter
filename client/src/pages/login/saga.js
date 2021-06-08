import { put } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadingUI,
  setError,
  clearError,
} from '../../store/reducers/uiReducer';
import { setUser, loadingUser } from './reducer';

const getLogin = async (payload) => {
  const content = { ...payload };
  const data = await axios.post('/login', content);
  return data;
};
const getRegister = async (payload) => {
  const content = { ...payload };
  const data = await axios.post('/signup', content);
  return data;
};
const getUserData = async (payload) => {
  const content = { ...payload };
  const data = await axios.get('/user', content);
  return data;
};
const uploadImage = async (payload) => {
  const data = await axios.get('/user', payload);
  return data;
};
function* unpuzzleLoginSaga(action) {
  try {
    yield put(loadingUI());
    const response = yield getLogin(action.payload);
    if (response.data) {
      const { token } = response.data;
      localStorage.setItem('authToken', `Bearer ${token}`);
      const userresponse = yield getUserData(action.payload);
      yield put(clearError(response.data));
      yield put(setUser(userresponse.data));
    } else {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError({ message: error.message }));
  }
}
function* unpuzzleUploadImageSaga(action) {
  try {
    yield put(loadingUser());
    const response = yield uploadImage(action.payload);
    if (response.data) {
      const userresponse = yield getUserData(action.payload);
      yield put(clearError(response.data));
      yield put(setUser(userresponse.data));
    } else {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError({ message: error.message }));
  }
}
function* unpuzzleRegisterSaga(action) {
  try {
    yield put(loadingUI());
    const response = yield getRegister(action.payload);
    if (response.data) {
      const { token } = response.data;
      localStorage.setItem('authToken', `Bearer ${token}`);
      const userresponse = yield getUserData(action.payload);
      yield put(clearError(response.data));
      yield put(setUser(userresponse.data));
    } else {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError({ message: error.message }));
  }
}
function* unpuzzleUserData(action) {
  try {
    yield put(loadingUser());
    const response = yield getUserData(action.payload);
    if (response.data) {
      yield put(setUser(response.data));
    } else {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}
export {
  unpuzzleLoginSaga,
  unpuzzleRegisterSaga,
  unpuzzleUserData,
  unpuzzleUploadImageSaga,
};
export default {};

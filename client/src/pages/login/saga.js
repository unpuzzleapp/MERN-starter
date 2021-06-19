import { put } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadingUI,
  setError,
  clearError,
} from '../../store/reducers/uiReducer';
import { setUser, loadingUser } from './reducer';
import { encrypt } from '../../utils/encryption';

const getLogin = async (payload) => {
  const content = { ...payload };
  content.password = encrypt(content.password);
  const data = await axios.post('/login', content);
  return data;
};
const editUserProfile = async (payload) => {
  const content = { ...payload };
  const data = await axios.post('/user', content);
  return data;
};
const getRegister = async (payload) => {
  const content = { ...payload };
  content.password = encrypt(content.password);
  const data = await axios.post('/register', content);
  return data;
};
const getUserData = async (payload) => {
  const content = { ...payload };
  const data = await axios.get('/user', content);
  return data;
};
const uploadImage = async (payload) => {
  const data = await axios.post(
    'https://us-east1-unpuzzle-ad500.cloudfunctions.net/api/user/image',
    payload,
  );
  return data;
};
function* unpuzzleLoginSaga(action) {
  try {
    yield put(loadingUI());
    const response = yield getLogin(action.payload);
    if (response.data) {
      const { token } = response.data.data;
      localStorage.setItem('authToken', `${token}`);
      const userresponse = yield getUserData(action.payload);
      yield put(clearError(response.data.data));
      yield put(setUser(userresponse.data.data));
    } else {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError({ message: error.message }));
  }
}
function* unpuzzleUpdateProfileSaga(action) {
  try {
    yield put(loadingUI());
    const response = yield editUserProfile(action.payload);
    if (response.data) {
      const userresponse = yield getUserData(action.payload);
      yield put(clearError(response.data.data));
      yield put(setUser(userresponse.data.data));
    } else {
      yield put(setError(response.data.message));
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
      yield put(clearError(response.data.data));
      yield put(setUser(userresponse.data.data));
    } else {
      yield put(setError(response.data.message));
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
      const { token } = response.data.data;
      localStorage.setItem('authToken', `${token}`);
      const userresponse = yield getUserData(action.payload);
      yield put(clearError(response.data.data));
      yield put(setUser(userresponse.data.data));
    } else {
      yield put(setError(response.data.message));
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
      yield put(setUser(response.data.data));
    } else {
      yield put(setError(response.data.message));
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
  unpuzzleUpdateProfileSaga,
};
export default {};

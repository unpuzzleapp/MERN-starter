import { put } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadingUI,
  setError,
  clearError,
} from '../../store/reducers/uiReducer';
import { setUser } from './reducer';

const getLogin = async (payload) => {
  const content = { ...payload };
  const data = await axios.post('/login', content);
  return data;
};
const getUserData = async (payload) => {
  const content = { ...payload };
  const data = await axios.get('/user', content);
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
export { unpuzzleLoginSaga };
export default {};

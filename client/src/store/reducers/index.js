import { combineReducers } from '@reduxjs/toolkit';
import helloWorldReducer from '../../pages/login/reducer';

const reducer = combineReducers({ helloWorldReducer });
export default reducer;

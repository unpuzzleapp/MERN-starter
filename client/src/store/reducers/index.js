import { combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import login from '../../pages/auth/reducer';
import list from '../../pages/list/reducer';
import user from '../../pages/login/reducer';
import UI from './uiReducer';
import data from '../../pages/PuzzleTweet/reducer';

const reducer = combineReducers({ login, list, user, UI, data });
export default reducer;

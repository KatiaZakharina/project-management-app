import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './reducers/user/userSlice';

export const rootReducer = combineReducers({
  userReducer,
});

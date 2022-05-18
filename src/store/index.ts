import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './reducers/user/userSlice';
import boardsReducer from './reducers/boards/boardsSlice';

export const rootReducer = combineReducers({
  userReducer,
  boardsReducer,
});

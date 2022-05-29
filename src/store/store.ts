import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './index';
import { getLoginToken } from 'helpers/getFromCookie';

function getState() {
  let state = {} as RootState;
  const token = getLoginToken();
  if (localStorage.getItem('app')) {
    const app: string = localStorage.getItem('app') || '';
    state = JSON.parse(app);
    state.userReducer.errorMessage = '';
    state.userReducer.isRegistered = false;
    if (!token) {
      state.userReducer.isAuthorized = false;
    }
  }
  return state;
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getState(),
});

store.subscribe(() => {
  localStorage.setItem('app', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { loginServiceInstance } from 'service/userService';
import { DataForRegestry, IdefaultState, LoginUserResponse, RegesterUserResponse } from './type';

export const defaultState: IdefaultState = {
  id: '',
  login: '',
  name: '',
  errorMessage: ' ',
  isAuthorized: false,
  isRegistered: false,
};

export const registerUser = createAsyncThunk<
  RegesterUserResponse,
  DataForRegestry,
  { rejectValue: string }
>('user/signup', async (userData: DataForRegestry, { rejectWithValue }) => {
  try {
    const data = await loginServiceInstance.postUser(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    } else {
      return rejectWithValue('Something went wrong...');
    }
  }
});

export const loginUser = createAsyncThunk<
  LoginUserResponse,
  DataForRegestry,
  { rejectValue: string }
>('user/signin', async (userData: DataForRegestry, { rejectWithValue }) => {
  try {
    const response = await loginServiceInstance.getToken(userData);
    document.cookie = `user=${response.token};max-age=86400;samesite=lax;path=/`;
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    setUnauthorized(state) {
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state: IdefaultState) => {
        state.errorMessage = '';
      })
      .addCase(loginUser.pending, (state: IdefaultState) => {
        state.errorMessage = '';
      })
      .addCase(
        registerUser.rejected,
        (state: IdefaultState, { payload = 'Something went wrong...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(
        loginUser.rejected,
        (state: IdefaultState, { payload = 'Incorrect login or password...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(loginUser.fulfilled, (state: IdefaultState) => {
        state.isAuthorized = true;
      })
      .addCase(registerUser.fulfilled, (state: IdefaultState) => {
        state.isRegistered = true;
      });
  },
});

export const { setUnauthorized } = userSlice.actions;
export default userSlice.reducer;

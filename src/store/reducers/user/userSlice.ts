import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { loginServiceInstance } from 'service/userService';
import {
  AllUsersResponse,
  DataForRegistry,
  IDefaultState,
  LoginUserResponse,
  RegisterUserResponse,
} from './type';

export const defaultState: IDefaultState = {
  users: [],
  id: '',
  login: '',
  name: '',
  errorMessage: '',
  isAuthorized: false,
  isRegistered: false,
};

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  DataForRegistry,
  { rejectValue: string }
>('user/signup', async (userData: DataForRegistry, { rejectWithValue }) => {
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
  DataForRegistry,
  { rejectValue: string }
>('user/signin', async (userData: DataForRegistry, { rejectWithValue }) => {
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

export const getAllUsers = createAsyncThunk<AllUsersResponse[]>('user/users', async () => {
  const response = await loginServiceInstance.getAllUsers();
  return response;
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
      .addCase(registerUser.pending, (state: IDefaultState) => {
        state.errorMessage = '';
      })
      .addCase(loginUser.pending, (state: IDefaultState) => {
        state.errorMessage = '';
      })
      .addCase(
        registerUser.rejected,
        (state: IDefaultState, { payload = 'Something went wrong...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(
        loginUser.rejected,
        (state: IDefaultState, { payload = 'Incorrect login or password...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(loginUser.fulfilled, (state: IDefaultState) => {
        state.isAuthorized = true;
      })
      .addCase(registerUser.fulfilled, (state: IDefaultState) => {
        state.isRegistered = true;
      })
      .addCase(getAllUsers.fulfilled, (state: IDefaultState, { payload }) => {
        state.users = payload;
      });
  },
});

export const { setUnauthorized } = userSlice.actions;
export default userSlice.reducer;

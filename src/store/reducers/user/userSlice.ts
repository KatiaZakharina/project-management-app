import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { loginServiceInstance } from 'service/userService';
import { UserData, IdefaultState, LoginUserResponse, UserDataResponse, EditProps } from './type';

export const defaultState: IdefaultState = {
  id: '',
  login: '',
  name: '',
  password: '',
  errorMessage: ' ',
  isAuthorized: false,
  isRegistered: false,
};

export const registerUser = createAsyncThunk<UserDataResponse, UserData, { rejectValue: string }>(
  'user/signup',
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const data = await loginServiceInstance.postUser(userData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk<LoginUserResponse, UserData, { rejectValue: string }>(
  'user/signin',
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await loginServiceInstance.getToken(userData);
      document.cookie = `user=${response.token};max-age=86400;samesite=lax;path=/`;
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const saveUserData = createAsyncThunk<UserDataResponse, string, { rejectValue: string }>(
  'user/getUserData',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await loginServiceInstance.getUser(userId);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const editUser = createAsyncThunk<unknown, EditProps, { rejectValue: string }>(
  'user/edit',
  async ({ data, userId }: EditProps, { rejectWithValue }) => {
    try {
      return await loginServiceInstance.updateUser(userId, data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setUnauthorized(state) {
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserData.fulfilled, (state: IdefaultState, { payload }) => {
        state.id = payload.id;
        state.login = payload.login;
        state.name = payload.name;
      })
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
          console.log(payload, 'pay');
          state.errorMessage = payload;
        }
      )
      .addCase(
        saveUserData.rejected,
        (state: IdefaultState, { payload = 'Something went wrong...' }) => {
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

export const { setUnauthorized, setPassword } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { loginServiceInstance } from 'service/userService';
import {
  DataForRegistry,
  IDefaultState,
  LoginUserResponse,
  IUser,
  EditProps,
  LoginData,
} from './type';
import { getLoginToken, getPassword } from 'helpers/getFromCookie';
import { getUserDataFromToken } from 'helpers/getUserDataFromToken';

export const defaultState: IDefaultState = {
  users: [],
  id: '',
  user: null,
  errorMessage: '',
  isAuthorized: false,
  isRegistered: false,
  isDeleted: false,
};

export const registerUser = createAsyncThunk<IUser, DataForRegistry, { rejectValue: string }>(
  'user/signup',
  async (userData: DataForRegistry, { rejectWithValue }) => {
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
  }
);

export const editUser = createAsyncThunk<DataForRegistry, EditProps, { rejectValue: string }>(
  'user/edit',
  async ({ id, data }: EditProps, { rejectWithValue }) => {
    try {
      return await loginServiceInstance.updateUser(id, data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const deleteUser = createAsyncThunk<void, string, { rejectValue: string }>(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await loginServiceInstance.deleteUser(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk<LoginUserResponse, LoginData, { rejectValue: string }>(
  'user/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginServiceInstance.getToken(userData);
      document.cookie = `user=${response.token};max-age=86400;samesite=lax;path=/`;
      document.cookie = `password=${userData.password};max-age=86400;samesite=lax;path=/`;
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
  'user/users',
  async (_, { rejectWithValue }) => {
    try {
      const response = await loginServiceInstance.getAllUsers();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const fetchUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
  'user/fetchUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await loginServiceInstance.getUser(id);
      return response;
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
    setUnauthorized(state) {
      state.isAuthorized = false;
      state.id = '';
      state.user = null;

      const token = getLoginToken();
      const password = getPassword();
      document.cookie = `user=${token};max-age=0;samesite=lax;path=/`;
      document.cookie = `password=${password};max-age=0;samesite=lax;path=/`;
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
      .addCase(fetchUser.pending, (state: IDefaultState) => {
        state.user = null;
      })
      .addCase(editUser.pending, (state: IDefaultState) => {
        state.user = null;
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
      .addCase(
        getAllUsers.rejected,
        (state: IDefaultState, { payload = 'Incorrect login or password...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(
        fetchUser.rejected,
        (state: IDefaultState, { payload = 'Something went wrong...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(
        editUser.rejected,
        (state: IDefaultState, { payload = 'Something went wrong...' }) => {
          state.errorMessage = payload;
        }
      )
      .addCase(
        deleteUser.rejected,
        (state: IDefaultState, { payload = 'Something went wrong...' }) => {
          state.errorMessage = payload;
        }
      )

      .addCase(loginUser.fulfilled, (state: IDefaultState, { payload }) => {
        state.isAuthorized = true;

        const { userId } = getUserDataFromToken(payload.token);
        state.id = userId;
      })
      .addCase(registerUser.fulfilled, (state: IDefaultState) => {
        state.isRegistered = true;
      })
      .addCase(fetchUser.fulfilled, (state: IDefaultState, { payload }) => {
        const password = getPassword();
        state.user = { ...payload, password };
      })
      .addCase(editUser.fulfilled, (state: IDefaultState, { payload }) => {
        document.cookie = `password=${payload.password};max-age=0;samesite=lax;path=/`;
        //FIXME: token time
        state.user = { ...payload, password: payload.password };
      })
      .addCase(getAllUsers.fulfilled, (state: IDefaultState, { payload }) => {
        state.users = payload;
      })
      .addCase(deleteUser.fulfilled, (state: IDefaultState) => {
        state.isDeleted = true;
      });
  },
});

export const { setUnauthorized } = userSlice.actions;
export default userSlice.reducer;

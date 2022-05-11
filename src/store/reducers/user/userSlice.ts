import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { loginServiceInstance, RegesterUserResponse } from 'service/userService';
import { DataForRegestry, IdefaultState } from './type';

export const defaultState: IdefaultState = {
  id: '',
  login: '',
  name: '',
  errorMessage: '',
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

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state: IdefaultState) => {
        state.errorMessage = '';
      })
      // .addCase(loadCard.fulfilled, (state: IdefaultState, action) => {
      //   state.card = action.payload;
      //   state.loading = false;
      // })
      .addCase(
        registerUser.rejected,
        (state: IdefaultState, { payload = 'Something went wrong...' }) => {
          state.errorMessage = payload;
        }
      );
  },
});

export default userSlice.reducer;

export const {} = userSlice.actions;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BoardDataType } from 'appConstants/types';
import { AxiosError } from 'axios';

import { loginServiceInstance } from 'service/userService';

export const defaultBoardsState = {
  boards: <BoardDataType[]>[],
};

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await loginServiceInstance.getBoards();
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

const boardsSlice = createSlice({
  name: 'boards',
  initialState: defaultBoardsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchBoards.fulfilled,
      (
        state,
        {
          payload,
        }: {
          payload: BoardDataType[];
        }
      ) => {
        state.boards = payload;
      }
    );
  },
});

export default boardsSlice.reducer;

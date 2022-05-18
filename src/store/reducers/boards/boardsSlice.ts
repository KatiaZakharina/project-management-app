import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { boardsServiceInstance } from 'service/boardsService';
import { BoardDataType, IDefaultBoardState } from 'store/reducers/boards/types';

export const defaultBoardsState: IDefaultBoardState = {
  boards: [],
};

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.getBoards();
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

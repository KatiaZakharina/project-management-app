import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { boardsServiceInstance } from 'service/boardsService';
import { BoardDataType, IDefaultBoardState } from 'store/reducers/boards/types';

export const defaultBoardsState: IDefaultBoardState = {
  boards: [],
  currentBoard: null,
  errorMessage: '',
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

export const fetchBoardData = createAsyncThunk<BoardDataType, string, { rejectValue: string }>(
  'boards/fetchColumns',
  async (id, { rejectWithValue }) => {
    try {
      return await boardsServiceInstance.getBoard(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState: defaultBoardsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, { payload }: { payload: BoardDataType[] }) => {
        state.boards = payload;
      })
      .addCase(fetchBoardData.pending, (state) => {
        state.currentBoard = null;
      })
      .addCase(fetchBoardData.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(fetchBoardData.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      });
  },
});

export default boardsSlice.reducer;

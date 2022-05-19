import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { boardsServiceInstance } from 'service/boardsService';
import { BoardDataType, IDefaultBoardState } from 'store/reducers/boards/types';

export const defaultBoardsState: IDefaultBoardState = {
  boards: [],
  error: '',
  currentBoard: null,
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

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData: { title: string }, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.createBoard(boardData);
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

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.deleteBoard(id);
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

export const getBoardByID = createAsyncThunk(
  'boards/getBoardByID',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.getBoardByID(id);
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
    builder
      .addCase(fetchBoards.pending, (state: IDefaultBoardState) => {
        state.error = '';
      })
      .addCase(
        fetchBoards.fulfilled,
        (state: IDefaultBoardState, { payload }: { payload: BoardDataType[] }) => {
          state.boards = payload;
        }
      )
      .addCase(
        getBoardByID.fulfilled,
        (state: IDefaultBoardState, { payload }: { payload: BoardDataType }) => {
          state.currentBoard = payload;
        }
      );
  },
});

export default boardsSlice.reducer;

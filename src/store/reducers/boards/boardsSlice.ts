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

export const fetchBoardData = createAsyncThunk<BoardDataType, string, { rejectValue: string }>(
  'boards/fetchBoardData',
  async (id, { rejectWithValue }) => {
    try {
      return await boardsServiceInstance.getBoardById(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

// export const createColumn = createAsyncThunk(
//   'boards/createColumn',
//   async (columnData: { title: string }, { rejectWithValue }) => {
//     try {
//       const data = await boardsServiceInstance.createColumn(id, columnData);
//       return data;
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         return rejectWithValue(error?.response?.data.message);
//       } else {
//         return rejectWithValue('Something went wrong...');
//       }
//     }
//   }
// );

const boardsSlice = createSlice({
  name: 'boards',
  initialState: defaultBoardsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state: IDefaultBoardState) => {
        state.errorMessage = '';
      })
      .addCase(
        fetchBoards.fulfilled,
        (state: IDefaultBoardState, { payload }: { payload: BoardDataType[] }) => {
          state.boards = payload;
        }
      )
      .addCase(fetchBoardData.pending, (state) => {
        state.currentBoard = null;
      })
      .addCase(fetchBoardData.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(fetchBoardData.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })
      .addCase(createBoard.pending, (state) => {
        state.currentBoard = null;
      });
  },
});

export default boardsSlice.reducer;

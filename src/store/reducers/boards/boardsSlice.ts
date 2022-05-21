import { IColumnFetchData, IUpdateBoardData } from './types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { boardsServiceInstance } from 'service/boardsService';
import { BoardDataType, IDefaultBoardState, BoardColumnsType } from 'store/reducers/boards/types';

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
      }
    }
  }
);

export const createBoard = createAsyncThunk<
  BoardDataType,
  { title: string },
  { rejectValue: string }
>('boards/createBoard', async (boardData: { title: string }, { rejectWithValue }) => {
  try {
    const data = await boardsServiceInstance.createBoard(boardData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
});

export const deleteBoard = createAsyncThunk<BoardDataType, string, { rejectValue: string }>(
  'boards/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.deleteBoard(id);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const updateBoard = createAsyncThunk<
  BoardDataType,
  IUpdateBoardData,
  { rejectValue: string }
>('boards/updateBoard', async ({ id, boardData }: IUpdateBoardData, { rejectWithValue }) => {
  try {
    const data = await boardsServiceInstance.updateBoard(id, boardData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
});

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

export const createColumn = createAsyncThunk<
  BoardColumnsType,
  IColumnFetchData,
  { rejectValue: string }
>('boards/createColumn', async ({ id, columnData }: IColumnFetchData, { rejectWithValue }) => {
  try {
    const data = await boardsServiceInstance.createColumn(id, columnData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
});

export const deleteColumn = createAsyncThunk<
  string,
  { boardId: string; columnId: string },
  { rejectValue: string }
>('boards/deleteColumn', async ({ boardId, columnId }, { rejectWithValue }) => {
  try {
    await boardsServiceInstance.deleteColumn(boardId, columnId);
    return columnId;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue('Something went wrong...');
  }
});

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

      .addCase(createBoard.pending, (state) => {
        state.errorMessage = '';
        state.currentBoard = null;
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        state.boards.push(payload);
        state.currentBoard = payload;
      })
      .addCase(createBoard.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(deleteBoard.pending, (state) => {
        state.errorMessage = '';
        state.currentBoard = null;
      })
      .addCase(deleteBoard.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(fetchBoardData.pending, (state) => {
        state.errorMessage = '';
        state.currentBoard = null;
      })
      .addCase(fetchBoardData.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(fetchBoardData.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(updateBoard.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(updateBoard.fulfilled, (state, { payload }) => {
        if (state.currentBoard) {
          state.currentBoard.id = payload.id;
          state.currentBoard.title = payload.title;
        }
      })
      .addCase(updateBoard.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(createColumn.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(createColumn.fulfilled, (state, { payload }) => {
        state.currentBoard?.columns?.push(payload);
      })
      .addCase(createColumn.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        const id = payload;
        console.log(payload);

        if (!state.currentBoard?.columns) return;
        state.currentBoard.columns = state.currentBoard.columns.filter(
          (column) => column.id !== id
        );
      })
      .addCase(deleteColumn.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      });
  },
});

export default boardsSlice.reducer;

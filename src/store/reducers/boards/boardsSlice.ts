import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { boardsServiceInstance } from 'service/boardsService';
import {
  BoardDataType,
  IDefaultBoardState,
  BoardColumnsType,
  IColumnFetchData,
  IUpdateBoardData,
  ITaskDelete,
  ITaskDeleteResponse,
  ITaskFetchData,
  ITaskResponse,
} from 'store/reducers/boards/types';

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
  { title: string; description: string },
  { rejectValue: string }
>(
  'boards/createBoard',
  async (boardData: { title: string; description: string }, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.createBoard(boardData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);

export const deleteBoard = createAsyncThunk<string, string, { rejectValue: string }>(
  'boards/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      await boardsServiceInstance.deleteBoard(id);
      return id;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
      return rejectWithValue('Something went wrong...');
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
      return rejectWithValue('Something went wrong...');
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

export const createTask = createAsyncThunk<ITaskResponse, ITaskFetchData, { rejectValue: string }>(
  'column/createTask',
  async ({ boardId, columnId, taskData }: ITaskFetchData, { rejectWithValue }) => {
    try {
      const data = await boardsServiceInstance.createTask(boardId, columnId, taskData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
      return rejectWithValue('Something went wrong...');
    }
  }
);

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

export const deleteTask = createAsyncThunk<
  ITaskDeleteResponse,
  ITaskDelete,
  { rejectValue: string }
>('column/deleteTask', async ({ boardId, columnId, taskId }: ITaskDelete, { rejectWithValue }) => {
  try {
    await boardsServiceInstance.deleteTask(boardId, columnId, taskId);
    return { columnId, taskId };
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue('Something went wrong...');
  }
});

export const updateColumn = createAsyncThunk<
  BoardColumnsType,
  { boardId: string; columnId: string; columnData: { title: string; order: number } },
  { rejectValue: string }
>('boards/updateColumn', async ({ boardId, columnId, columnData }, { rejectWithValue }) => {
  try {
    const data = await boardsServiceInstance.updateColumn(boardId, columnId, columnData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue('Something went wrong...');
  }
});

export const updateTask = createAsyncThunk<ITaskResponse, ITaskFetchData, { rejectValue: string }>(
  'column/updateTask',
  async ({ boardId, columnId, taskData, taskId }: ITaskFetchData, { rejectWithValue }) => {
    try {
      if (taskId) {
        const data = await boardsServiceInstance.updateTask(boardId, columnId, taskData, taskId);
        return data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data.message);
      }
      return rejectWithValue('Something went wrong...');
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
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        const id = payload;
        state.boards = state.boards.filter((board) => board.id !== id);
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

        if (!state.currentBoard?.columns) return;
        state.currentBoard.columns = state.currentBoard.columns.filter(
          (column) => column.id !== id
        );
      })
      .addCase(deleteColumn.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(updateColumn.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(updateColumn.fulfilled, (state, { payload }) => {
        if (state.currentBoard?.columns) {
          const columnIndex = state.currentBoard.columns.findIndex(
            (column) => column.id === payload.id
          );
          state.currentBoard.columns[columnIndex].title = payload.title;
          state.currentBoard.columns[columnIndex].order = payload.order;
        }
      })
      .addCase(updateColumn.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(createTask.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        const currentColumnIndex = state.currentBoard?.columns?.findIndex(
          (column) => column.id === payload.columnId
        );
        if (!state.currentBoard?.columns || (!currentColumnIndex && currentColumnIndex !== 0))
          return;
        state.currentBoard.columns[currentColumnIndex].tasks?.push(payload);
      })
      .addCase(createTask.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(updateTask.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const currentColumnIndex = state.currentBoard?.columns?.findIndex(
          (column) => column.id === payload.columnId
        );
        if (!state.currentBoard?.columns || (!currentColumnIndex && currentColumnIndex !== 0))
          return;
        const currentTaskIndex = state.currentBoard?.columns[currentColumnIndex].tasks?.findIndex(
          (task: { id: string }) => task.id === payload.id
        );

        state.currentBoard.columns[currentColumnIndex].tasks![currentTaskIndex!].title =
          payload.title;

        state.currentBoard.columns[currentColumnIndex].tasks![currentTaskIndex!].description =
          payload.description;

        state.currentBoard.columns[currentColumnIndex].tasks![currentTaskIndex!].userId =
          payload.userId;
      })
      .addCase(updateTask.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      })

      .addCase(deleteTask.pending, (state) => {
        state.errorMessage = '';
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        const columnId = payload.columnId;
        const taskId = payload.taskId;

        const currentColumnIndex = state.currentBoard?.columns?.findIndex(
          (column) => column.id === columnId
        );
        if (!state.currentBoard?.columns || (!currentColumnIndex && currentColumnIndex !== 0))
          return;
        state.currentBoard.columns[currentColumnIndex].tasks = state.currentBoard?.columns[
          currentColumnIndex
        ].tasks?.filter((task) => task.id !== taskId);
      })
      .addCase(deleteTask.rejected, (state, { payload = 'Something went wrong...' }) => {
        state.errorMessage = payload;
      });
  },
});

export default boardsSlice.reducer;

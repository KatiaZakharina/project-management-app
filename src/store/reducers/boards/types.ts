export type BoardDataType = {
  id: string;
  title: string;
  description: string;
  columns?: BoardColumnsType[];
};

export type BoardColumnsType = {
  id: string;
  title: string;
  order: number;
  tasks?: BoardTasksType[];
};

export type BoardTasksType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files?: {
    filename: string;
    fileSize: number;
  }[];
};

export interface IDefaultBoardState {
  boards: BoardDataType[];
  errorMessage: string;
  currentBoard: BoardDataType | null;
}

export interface IColumnFetchData {
  id: string;
  columnData: {
    title: string;
  };
}

export interface ITaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
}

export interface ITaskFetchData {
  boardId: string;
  columnId: string;
  taskData: {
    description: string;
    order?: number;
    title: string;
    userId: string;
  };
  taskId?: string;
}

export interface ITaskUpdate {
  boardId: string;
  columnId: string;
  description: string;
  order?: number;
  title: string;
  userId: string;
}

export interface ITaskUpdateData {
  updateTaskData: ITaskUpdate;
  taskId: string;
}

export interface ITaskDelete {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface ITaskDeleteResponse {
  columnId: string;
  taskId: string;
}

export interface IUpdateBoardData {
  id: string;
  boardData: {
    title: string;
    description: string;
  };
}

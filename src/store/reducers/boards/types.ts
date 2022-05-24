export type BoardDataType = {
  id: string;
  title: string;
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
  done?: boolean;
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
    order: number;
  };
}

export interface ITaskResponse {
  id: string;
  title: string;
  order: 1;
  description: string;
  userId: string;
  columnId: string;
}

export interface ITaskFetchData {
  boardId: string;
  columnId: string;
  taskData: {
    description: string;
    order: number;
    title: string;
    userId: string;
  };
  taskId?: string;
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
  };
}

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
  done: boolean;
  description: string;
  userId: string;
  files: {
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

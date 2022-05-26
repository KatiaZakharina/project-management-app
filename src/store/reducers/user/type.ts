export interface IDefaultState {
  users: IUser[];
  id: string;
  password: string;
  errorMessage: string;
  isAuthorized: boolean;
  isRegistered: boolean;
  isDeleted: boolean;
}

export interface DataForRegistry {
  name?: string;
  login: string;
  password?: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface LoginUserResponse {
  token: string;
}

export type EditProps = { userId: string; data: DataForRegistry };

export interface IDefaultState {
  users: IUser[];
  id: string;
  login: string;
  name: string;
  errorMessage: string;
  isAuthorized: boolean;
  isRegistered: boolean;
}

export interface DataForRegistry {
  name?: string;
  login: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface LoginUserResponse {
  token: string;
}

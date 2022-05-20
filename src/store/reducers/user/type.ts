export interface IDefaultState {
  users: AllUsersResponse[];
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

export interface RegisterUserResponse {
  id: string;
  name: string;
  login: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface AllUsersResponse {
  id: string;
  name: string;
  login: string;
}

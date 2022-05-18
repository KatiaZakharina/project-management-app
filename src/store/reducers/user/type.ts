export interface IdefaultState {
  id: string;
  login: string;
  name: string;
  password: string;
  errorMessage: string;
  isAuthorized: boolean;
  isRegistered: boolean;
}

export interface UserData {
  name?: string;
  login: string;
  password?: string;
}

export interface UserDataResponse {
  id: string;
  name: string;
  login: string;
}

export interface LoginUserResponse {
  token: string;
}

export type EditProps = { userId: string; data: UserData };

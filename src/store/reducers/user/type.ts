export interface IdefaultState {
  id: string;
  login: string;
  name: string;
  errorMessage: string;
}

export interface DataForRegestry {
  name?: string;
  login: string;
  password: string;
}

export interface RegesterUserResponse {
  id: string;
  name: string;
  login: string;
}

export interface LoginUserResponse {
  token: string;
}

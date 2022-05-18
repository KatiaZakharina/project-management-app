import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { SERVER_URI } from 'appConstants';
import { getLoginToken } from 'helpers/getLoginToken';
import { UserData } from 'store/reducers/user/type';

class UserService {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseUrl = SERVER_URI;
    this.axiosInstance = axios.create({ baseURL: this.baseUrl, withCredentials: false });

    this.axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
      const token = getLoginToken();

      if (config.headers === undefined) {
        config.headers = {};
      }
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
  }

  getUsers = async () => {
    const response = await this.axiosInstance.get(`/users`);
    console.log(response.data);
    return response.data;
  };

  getUser = async (userId: string) => {
    const response = await this.axiosInstance.get(`/users/${userId}`);
    return response.data;
  };

  postUser = async (userData: UserData) => {
    const response = await this.axiosInstance.post('/signup', userData);
    return response.data;
  };

  updateUser = async (userId: string, data: UserData) => {
    const response = await this.axiosInstance.put(`/users/${userId}`, data);
    console.log(response);
    return response.data;
  };

  deleteUser = async (userId: string) => {
    const response = await this.axiosInstance.delete(`/user/${userId}`);
    console.log(response);
    return response.data;
  };

  getToken = async (userData: UserData) => {
    const response = await this.axiosInstance.post('/signin', userData);
    return response.data;
  };

  createBoard = async (boardData: { title: string }) => {
    const token = getLoginToken();
    try {
      const response = await this.axiosInstance.post('/boards', boardData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getBoards = async () => {
    const token = getLoginToken();
    try {
      const response = await this.axiosInstance.get('/boards', {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  deleteBoard = async (id: string) => {
    const token = getLoginToken();
    try {
      const response = await this.axiosInstance.delete(`/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export const loginServiceInstance = new UserService();

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { SERVER_URI } from 'appConstants';
import { getLoginToken } from 'helpers/getLoginToken';

class BoardsService {
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

  createBoard = async (boardData: { title: string }) => {
    const response = await this.axiosInstance.post('/boards', boardData);
    return response.data;
  };

  getBoards = async () => {
    const response = await this.axiosInstance.get('/boards');
    return response.data;
  };

  deleteBoard = async (id: string) => {
    const response = await this.axiosInstance.delete(`/boards/${id}`);
    return response.data;
  };

  getBoardByID = async (id: string) => {
    const response = await this.axiosInstance.get(`/boards/${id}`);
    return response.data;
  };
}

export const boardsServiceInstance = new BoardsService();

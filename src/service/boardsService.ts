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

  getBoards = async () => {
    const response = await this.axiosInstance.get('/boards');
    return response.data;
  };

  createBoard = async (boardData: { title: string; description: string }) => {
    const response = await this.axiosInstance.post('/boards', boardData);
    return response.data;
  };

  getBoardById = async (id: string) => {
    const response = await this.axiosInstance.get(`/boards/${id}`);
    return response.data;
  };

  deleteBoard = async (id: string) => {
    const response = await this.axiosInstance.delete(`/boards/${id}`);
    return response.data;
  };

  updateBoard = async (id: string, boardData: { title: string; description: string }) => {
    const response = await this.axiosInstance.put(`/boards/${id}`, boardData);
    return response.data;
  };

  createColumn = async (id: string, columnData: { title: string }) => {
    const response = await this.axiosInstance.post(`/boards/${id}/columns`, columnData);
    return response.data;
  };

  deleteColumn = async (boardId: string, columnId: string) => {
    const response = await this.axiosInstance.delete(`/boards/${boardId}/columns/${columnId}`);
    return response.data;
  };

  updateColumn = async (
    boardId: string,
    columnId: string,
    columnData: { title: string; order: number }
  ) => {
    const response = await this.axiosInstance.put(
      `/boards/${boardId}/columns/${columnId}`,
      columnData
    );
    return response.data;
  };
}

export const boardsServiceInstance = new BoardsService();

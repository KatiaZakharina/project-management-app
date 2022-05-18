import axios from 'axios';

import { SERVER_URI } from 'appConstants';
import { DataForRegestry } from 'store/reducers/user/type';
import { getLoginToken } from 'helpers/getLoginToken';

class userService {
  baseUrl: string = SERVER_URI;
  axiosInstance = axios.create({ baseURL: this.baseUrl, withCredentials: false });

  postUser = async (userData: DataForRegestry) => {
    try {
      const response = await this.axiosInstance.post('/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getToken = async (userData: DataForRegestry) => {
    try {
      const response = await this.axiosInstance.post('/signin', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
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

export const loginServiceInstance = new userService();

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { SERVER_URI } from 'appConstants';
import { DataForRegistry } from 'store/reducers/user/type';
import { getLoginToken } from 'helpers/getLoginToken';

class userService {
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

  postUser = async (userData: DataForRegistry) => {
    const response = await this.axiosInstance.post('/signup', userData);
    return response.data;
  };

  getToken = async (userData: DataForRegistry) => {
    const response = await this.axiosInstance.post('/signin', userData);
    return response.data;
  };

  getAllUsers = async () => {
    const response = await this.axiosInstance.get('/users');
    return response.data;
  };
}

export const loginServiceInstance = new userService();

import axios from 'axios';

import { SERVER_URI } from 'appConstants';
import { DataForRegestry } from 'store/reducers/user/type';

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
}

export const loginServiceInstance = new userService();

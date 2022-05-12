import axios from 'axios';

import { SERVER_URI } from 'appConstants';

interface DataForRegestry {
  name?: string;
  login: string;
  password: string;
}

export interface RegesterUserResponse {
  id: string;
  name: string;
  login: string;
}

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

  getToken = async ({ login, password }: DataForRegestry) => {
    return await this.axiosInstance.post('/signin', {
      login,
      password,
    });
  };

  getUsers = async (token: string) => {
    const { data } = await this.axiosInstance('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
}

export const loginServiceInstance = new userService();

import axios from 'axios';

import { SERVER_URI } from 'appConstants';

interface DataForRegestry {
  name: string;
  login: string;
  password: string;
}

class Service {
  baseUrl: string = SERVER_URI;
  axiosInstance = axios.create({ baseURL: this.baseUrl, withCredentials: false });

  postUser = async ({ name, login, password }: DataForRegestry) => {
    return await this.axiosInstance
      .post('/signup', {
        name,
        login,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
}

export const serviceInstance = new Service();

import axios, { AxiosResponse } from 'axios';

const baseUrl = '/api';

export const instance = axios.create({
  baseURL: baseUrl,
  timeout: 30000
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status;
    const check = /^2\d{2}$/;

    return new Promise((resolve, reject) => {
      check.test(String(status)) ? resolve(response) : reject(response);
    });
  },
  (error) => Promise.reject(error)
);

export default instance.request;

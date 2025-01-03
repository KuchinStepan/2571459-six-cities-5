import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {useDispatch} from 'react-redux';
import {AuthorizationStatus, API_URL, TokenKey} from '@constants';
import {setAuthorizationStatus} from '@store-actions';

export const getToken = (): string => localStorage.getItem(TokenKey) ?? '';

export const saveToken = (token: string): void => {
  localStorage.setItem(TokenKey, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TokenKey);
};

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const dispatch = useDispatch();
    if (error.response && error.response.status === 401) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });


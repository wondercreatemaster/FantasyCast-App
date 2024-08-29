import React, { createContext, useContext } from 'react';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const auth = useSelector(state => state.auth);

  const authAxios = axios.create({
    baseURL: 'https://fantasycastcentral.com/api',
  });

  const publicAxios = axios.create({
    baseURL: 'https://fantasycastcentral.com/api',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization && auth.token) {
        config.headers.Authorization = auth.token;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
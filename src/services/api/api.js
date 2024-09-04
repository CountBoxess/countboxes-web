import axios from 'axios';
import { showAlert } from '../../utils/showAlert';

const REACT_APP_BASE = 'http://localhost:3000';

export const api = axios.create({
  baseURL: REACT_APP_BASE, //USAR A URL DO .ENV
  timeout: 10000 // 10 segundos
});

//todo: verify req by req response if token is expired
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data &&
      error.response.data.description === 'Falha na autenticação, token inválido!'
    ) {
      localStorage.removeItem('token');
      api.defaults.headers.authorization = null;

      // Redirect to the login page
      window.location.href = '/signin';
    }

    if (error.response && error.response.status === 500) {
      showAlert({
        message: 'Falha ao se comunicar com o servidor',
        type: 'error'
      });
    }

    return Promise.reject(error);
  }
);

export const createSession = async (email, password) => {
  return api.post('/auth/login', { email, password });
};

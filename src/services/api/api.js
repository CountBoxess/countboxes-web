import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGUiLCJpYXQiOjE3MjQ4ODUyODAsImV4cCI6MTcyNDg4ODg4MH0.QN8F_IgEVZsnX73yHGvpLgYtCBi52ZeC5npgDzn0hgQ'
  }
});

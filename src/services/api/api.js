import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGUiLCJpYXQiOjE3MjQ4ODk3NzIsImV4cCI6MTcyNDg5MzM3Mn0.v63fGSSfJjTnZILOxJiKXUs5EVwlV63i5i2ubTiQ7G4'
  }
});

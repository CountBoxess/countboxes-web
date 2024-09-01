import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVkcm8gQ2hvdWVyeSBHcmlnb2xsaSIsImlhdCI6MTcyNTIwODI3MiwiZXhwIjoxNzI1MjExODcyfQ.Hgoz6hEnU-rLGt1bDy7UX-veMNDVdbsJlLjcsSzhhJ4'
  }
});

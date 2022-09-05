export const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';

export const CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000'
    : 'http://localhost:8000';

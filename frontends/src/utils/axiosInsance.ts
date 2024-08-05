import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5148',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

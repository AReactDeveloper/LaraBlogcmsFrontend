import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://laravel-article-cms-rest-api-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
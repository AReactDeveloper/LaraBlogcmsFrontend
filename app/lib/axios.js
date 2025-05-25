import axios from 'axios';
import Cookies from 'js-cookie'; // use js-cookie in browser only

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

if (typeof window !== 'undefined') {
  // Client-side only
  axiosInstance.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
      // Let axios set the correct multipart/form-data header with boundary
      delete config.headers['Content-Type'];
    } else {
      // For other requests, default to application/json
      config.headers['Content-Type'] = 'application/json';
    }
    
    // Add auth token if available
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  });
  
}

export default axiosInstance
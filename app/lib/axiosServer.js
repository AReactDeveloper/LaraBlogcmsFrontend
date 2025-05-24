import axios from 'axios';
import { cookies } from 'next/headers';

export default async function createAxiosWithAuth() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to attach token
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
}
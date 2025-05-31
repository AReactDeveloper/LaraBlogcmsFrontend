import axiosInstance from './axios';

/**
 * Logs in the user and returns response data.
 * The token is not stored here due to server-side context.
 */
export const login = async (email, password) => {
  const resObj = { data: null, error: null };

  try {
    const response = await axiosInstance.post('/api/login', { email, password });
    resObj.data = response.data;
  } catch (error) {
    resObj.error = error.response?.data || 'Login failed';
  }

  return resObj;
};

/**
 * Gets the currently authenticated user.
 */
export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/api/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logs out the user by sending a POST request to the backend
 * and destroying the token from cookies on the client.
 */
export const logOut = async () => {
  try {
    await axiosInstance.post('/api/logout');

    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Logout failed' };
  }
};

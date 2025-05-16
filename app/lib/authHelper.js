import axiosInstance from "./axios";


//log a user in 
export const login = async (email, password) => {
    const resObj = {
      data: null,
      error: null,
    };
  
    try {
      const response = await axiosInstance.post('/api/login', {
        email,
        password,
      });
  
      const token = response.data.token; 
  
      if (token) {
        localStorage.setItem('authToken', token);
      }
  
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error.response?.data || 'Login failed';
    }
  
    return resObj;
  };
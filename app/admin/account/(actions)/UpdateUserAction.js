'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';

export default async function UpdateUserAction(data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    await axiosInstance.put('/api/user', data);

    return {
      statusCode: 200,
      message: 'Author settings updated successfully',
    };
  } catch (error) {
    console.error('Cache purge error:', error?.response || error);
    return {
      statusCode: 400,
      message: 'There was a problem updating  autho settings. Please try again later.' + error,
    };
  }
}

'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function AddPageAction(data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    await axiosInstance.post('/api/pages/',data);

    // Revalidate cache
    revalidateTag('pages');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Page created successfully',
    };
  } catch (error) {
    console.error(error.response?.data || error.message);

    return {
      statusCode: error.response?.status || 500,
      message: 'Something went wrong while creating your page',
    };
  }
}

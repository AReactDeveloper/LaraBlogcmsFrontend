'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postAddTag(data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.post('/api/tags', data);

    console.log('Tag submitted:', response.data);

    revalidateTag('tags');
    revalidatePath('/admin/tags')
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Tag added successfully',
    };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error('Error submitting Tag:', error.response.data.message);
    } else {
      console.error('Error submitting Tag:', error.message);
    }
  }
}

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
    console.error('Error submitting Tag:', error);
    return {
      statusCode: 400,
      message: 'There was a problem submitting the Tag. Please try again later.',
    };
  }
}

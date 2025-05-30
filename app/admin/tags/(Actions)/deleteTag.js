'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function deleteTag(id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.delete('/api/tags/' + id);

    console.log('Tag deleted:', response.data);

    revalidateTag('tags');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Tag  deleted',
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      message: 'There was a problem deleting the tag. Please try again later.',
    };
  }
}

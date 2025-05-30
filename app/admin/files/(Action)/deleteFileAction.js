'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function deleteFileAction(id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.delete('/api/file/' + id);

    console.log('File deleted:');

    revalidateTag('articles');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'File  deleted',
    };
  } catch (error) {
    console.error(error.response.data);
    return {
      statusCode: 400,
      message: 'There was a problem deleted the File. Please try again later.',
    };
  }
}

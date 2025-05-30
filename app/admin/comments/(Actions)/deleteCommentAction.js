'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function deleteComment(id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.delete('/api/comment/' + id);

    revalidateTag('comments');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Comment  deleted',
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      message: 'There was a problem deleted the Comment. Please try again later.'  + error,
    };
  }
}

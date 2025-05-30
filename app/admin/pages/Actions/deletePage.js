'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function deletePage(id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    await axiosInstance.delete('/api/pages/' + id);

    // Revalidate cache
    revalidateTag('pages');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Page deleted successfully',
    };
  } catch (error) {
    console.error(error.response?.data || error.message);

    return {
      statusCode: error.response?.status || 500,
      message: 'Something went wrong while deleting your page',
    };
  }
}

'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function editPageAction(id,data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    await axiosInstance.put('/api/pages/' + id,data);

    // Revalidate cache
    revalidateTag('pages');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Page edited successfully',
    };
  } catch (error) {
    console.error(error.response?.data || error.message);

    return {
      statusCode: error.response?.status || 500,
      message: 'Something went wrong while editing your page',
    };
  }
}

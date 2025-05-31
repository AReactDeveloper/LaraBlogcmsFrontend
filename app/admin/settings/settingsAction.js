'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postToSettings(data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    await axiosInstance.put('/api/settings/1', data);
    revalidateTag('siteInfo');
    revalidatePath('/admin/settings')
    return {
      statusCode: 200,
      message: 'settings updated successfully',
    };
  } catch (error) {
    console.error(error.response);
    return {
      statusCode: 400,
      message: 'There was a problem submitting settings. Please try again later.',
    };
  }
}

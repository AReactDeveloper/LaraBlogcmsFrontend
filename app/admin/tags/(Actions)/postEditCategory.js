'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postEditTag(data,id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.put('/api/tags/'+id, data);

    console.log('Tag Edited:', response.data);

    revalidateTag('tags');
    revalidatePath('/admin/tags')
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Tag edited successfully',
    };
  } catch (error) {
    console.error('Error editing Tag:', error);
    return {
      statusCode: 400,
      message: 'There was a problem editing the tag. Please try again later.' ,
    };
  }
}

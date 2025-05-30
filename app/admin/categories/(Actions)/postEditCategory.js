'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postEditCategory(data,id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.put('/api/categories/'+id, data);

    console.log('Category Edited:', response.data);

    revalidateTag('categories');
    revalidatePath('/admin/categories')
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Category edited successfully',
    };
  } catch (error) {
    console.error('Error edited category:', error);
    return {
      statusCode: 400,
      message: 'There was a problem edited the category. Please try again later.' ,
    };
  }
}

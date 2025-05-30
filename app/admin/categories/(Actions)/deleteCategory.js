'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function deleteCategory(id) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.delete('/api/categories/' + id);

    console.log('Category deleted:', response.data);

    revalidateTag('categories');
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Category  deleted',
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      message: 'There was a problem deleted the category. Please try again later.',
    };
  }
}

'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postAddCategory(data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.post('/api/categories', data);

    console.log('Category submitted:', response.data);

    revalidateTag('categories');
    revalidatePath('/admin/categories')
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Category added successfully',
    };
  } catch (error) {
    console.error('Error submitting category:', error);
    return {
      statusCode: 400,
      message: 'There was a problem submitting the category. Please try again later.',
    };
  }
}

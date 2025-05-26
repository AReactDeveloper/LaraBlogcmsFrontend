'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function putEditArticle(data, slug) {
  try {
    const axiosInstance = await createAxiosWithAuth();

    // Send JSON data directly
    const response = await axiosInstance.put('/api/articles/' + slug, data);
    console.log('Article Edited:', response.data);

    // Revalidate relevant paths and tags
    revalidateTag('articles');
    revalidateTag(`article-${slug}`);
    revalidateTag('tags');
    revalidateTag('categories');
    revalidatePath('/blog');
    revalidatePath('/article/' + slug);
    revalidatePath('/');

    return {
      statusCode: 200,
      message: 'Article Updated successfully',
    };
  } catch (error) {
    const errorData = error.response?.data;
    const status = error.response?.status;

    console.error('Error updating article:', status, errorData || error.message);

    if (status === 422 && errorData?.errors) {
      return {
        statusCode: 422,
        message: 'Validation error',
        errors: errorData.errors,
      };
    }

    if (status === 401) {
      return {
        statusCode: 401,
        message: 'Unauthorized. Please log in again.',
      };
    }

    if (status === 500) {
      return {
        statusCode: 500,
        message: 'Server error. Please try again later.',
      };
    }

    if (status === 409) {
      return {
        statusCode: 409,
        message: 'Article already exists. titles must be unique',
      };
    }

    return {
      statusCode: status || 400,
      message:
        errorData?.message ||
        'Something went wrong while adding your article. Please try again.',
    };
  }
}

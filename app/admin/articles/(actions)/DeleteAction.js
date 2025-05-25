'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postDeleteAction(id) {
  try {
    const axiosInstance = await createAxiosWithAuth(); 
    await axiosInstance.delete('/api/articles/' + id);
    revalidateTag('articles');
    revalidatePath('/blog')
    revalidatePath('/')
    return 'Article deleted succuefully';
  } catch (error) {
    console.error(error.response?.data || error.message); //axios return is weird
    return 'Something went wrong while deleting your article';
  }
}
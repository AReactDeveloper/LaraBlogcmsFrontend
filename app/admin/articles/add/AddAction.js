'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidateTag } from 'next/cache';

export default async function postAddArticle(formData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const axiosInstance = await createAxiosWithAuth(); 
    await axiosInstance.post('/api/articles', data);
    revalidateTag('articles');
    return 'Article Added succuefully';
  } catch (error) {
    console.error(error.response?.data || error.message); //axios return is weird
    return 'Something went wrong while adding you article';
  }
}
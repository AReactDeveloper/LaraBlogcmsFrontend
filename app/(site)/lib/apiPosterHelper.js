'use server';

import { revalidateTag } from 'next/cache';
import axiosInstance from './axios';

export async function postComment(articleSlug, commentData) {
  try {
    const response = await axiosInstance.post('/api/comment', commentData);
    revalidateTag(`article-${articleSlug}`);
    revalidateTag(`articles`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
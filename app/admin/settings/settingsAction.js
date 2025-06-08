'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postToSettings(data) {
  try {
    const axiosInstance = await createAxiosWithAuth();
    await axiosInstance.put('/api/settings/1', data);

    // Revalidate global tags used in your app (adjust if needed)
    revalidateTag('siteInfo');
    revalidateTag('theme');
    revalidateTag('global');

    // Revalidate static/common paths only
    const staticPaths = [
      '/',
      '/admin/settings',
      '/article',
      '/blog',
      '/categories',
      '/tags',
    ];

    staticPaths.forEach(path => revalidatePath(path));

    return {
      statusCode: 200,
      message: 'Settings updated and cache fully purged (static paths only).',
    };
  } catch (error) {
    console.error('Cache purge error:', error?.response || error);
    return {
      statusCode: 400,
      message: 'There was a problem submitting settings. Please try again later.',
    };
  }
}

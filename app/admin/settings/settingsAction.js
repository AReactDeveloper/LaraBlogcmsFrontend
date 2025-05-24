'use server';

import createAxiosWithAuth from '@/app/lib/axiosServer';
import { revalidatePath, revalidateTag } from 'next/cache';

export default async function postToSettings(formData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const axiosInstance = await createAxiosWithAuth(); 
    await axiosInstance.put('/api/settings/1', data);
    revalidateTag('siteInfo');
    revalidatePath('/admin/settings')
    return 'Site info updated successfully';
  } catch (error) {
    console.error(error.response?.data || error.message); //axios return is weird
    return 'Something went wrong while updating the site info';
  }
}
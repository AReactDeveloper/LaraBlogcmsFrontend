'use server';
import createAxiosWithAuth from '@/app/lib/axiosServer';

export default async function fileUploadAction(file) {
  const formData = new FormData();
  formData.append('file', file);

  for (const [key, value] of formData.entries()) {
    console.log('FormData entry:', key, value);
  }

  try {
    const axiosInstance = await createAxiosWithAuth();
    const response = await axiosInstance.post('/api/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return {
      success: true,
      message: 'file uploaded successfully',
      url: response.data.url,
    };
  } catch (error) {
    console.error('Upload failed:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Upload failed',
      url: null,
    };
  }
}

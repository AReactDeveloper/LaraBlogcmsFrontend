import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  try {
    // Revalidate relevant paths and tags
    revalidateTag('articles');
    revalidateTag('tags');
    revalidateTag('categories');
    revalidatePath('/blog');
    revalidatePath('/');

    return new Response(JSON.stringify({ message: 'Revalidation successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API revalidation error:', error);
    return new Response(JSON.stringify({ message: 'Revalidation failed', error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}

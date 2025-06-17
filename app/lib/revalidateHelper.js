import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidateAll() {
  revalidateTag('articles');
  revalidateTag('pages');
  revalidateTag('categories');
  revalidateTag('tags');
  revalidatePath('/')
  revalidatePath('/article')
  revalidatePath('/blog')

  return { message : 'revalidated' };
}

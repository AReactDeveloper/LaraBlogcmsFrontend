import { unstable_revalidateTag } from 'next/cache';

// Revalidate all articles list
export async function revalidateArticles() {
  try {
    await unstable_revalidateTag('articles');
    return { success: true };
  } catch (error) {
    console.error('Revalidate articles failed:', error);
    return { success: false, error };
  }
}

// Revalidate all pages list
export async function revalidatePages() {
  try {
    await unstable_revalidateTag('articles'); // Check if this should be 'pages' instead of 'articles'
    return { success: true };
  } catch (error) {
    console.error('Revalidate pages failed:', error);
    return { success: false, error };
  }
}

// Revalidate single article by slug
export async function revalidateArticleBySlug(slug) {
  try {
    await unstable_revalidateTag(`article-${slug}`);
    return { success: true };
  } catch (error) {
    console.error(`Revalidate article ${slug} failed:`, error);
    return { success: false, error };
  }
}

// Revalidate single page by slug
export async function revalidatePageBySlug(slug) {
  try {
    await unstable_revalidateTag(`article-${slug}`); // Check if this should be 'page-${slug}'
    return { success: true };
  } catch (error) {
    console.error(`Revalidate page ${slug} failed:`, error);
    return { success: false, error };
  }
}

// Revalidate all categories
export async function revalidateCategories() {
  try {
    await unstable_revalidateTag('categories');
    return { success: true };
  } catch (error) {
    console.error('Revalidate categories failed:', error);
    return { success: false, error };
  }
}

// Revalidate all tags
export async function revalidateTags() {
  try {
    await unstable_revalidateTag('tags');
    return { success: true };
  } catch (error) {
    console.error('Revalidate tags failed:', error);
    return { success: false, error };
  }
}

// Revalidate tag by title
export async function revalidateTagByTitle(title) {
  try {
    await unstable_revalidateTag(`tag-${title}`);
    return { success: true };
  } catch (error) {
    console.error(`Revalidate tag ${title} failed:`, error);
    return { success: false, error };
  }
}

// Revalidate category by title
export async function revalidateCategoryByTitle(title) {
  try {
    await unstable_revalidateTag(`category-${title}`);
    return { success: true };
  } catch (error) {
    console.error(`Revalidate category ${title} failed:`, error);
    return { success: false, error };
  }
}

// Revalidate site info
export async function revalidateSiteInfo() {
  try {
    await unstable_revalidateTag('site-info');
    return { success: true };
  } catch (error) {
    console.error('Revalidate site-info failed:', error);
    return { success: false, error };
  }
}

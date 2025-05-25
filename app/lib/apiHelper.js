import { unstable_cache } from 'next/cache';

const revalidationTime = 1;
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// List all articles
export const getArticles = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/articles`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json() || [];
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['articles'],
  { revalidate: revalidationTime }
);

// List all Pages
export const getPages = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/pages/`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json() || [];
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['pages'],
  { revalidate: revalidationTime }
);

// Get a single page by slug
export const getPageBySlug = unstable_cache(
  async (slug) => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/pages/${slug}`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json();
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (slug) => [`article-${slug}`],
  { revalidate: revalidationTime }
);

// Get a single article by slug
export const getArticleBySlug = unstable_cache(
  async (slug) => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/articles/${slug}`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json();
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (slug) => [`article-${slug}`],
  { revalidate: revalidationTime }
);

// Get a list of all categories
export const getCategories = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/categories/`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json() || [];
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['categories'],
  { revalidate: revalidationTime }
);

// Get a list of all tags
export const getTags = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/tags/`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json();
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['tags'],
  { revalidate: revalidationTime }
);

// Get tag by title
export const getTagByTitle = unstable_cache(
  async (title) => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/tags/${title}`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json();
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (title) => [`tag-${title}`],
  { revalidate: revalidationTime }
);

// Get category by title
export const getCategoryByTitle = unstable_cache(
  async (title) => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/categories/${title}`);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = await response.json();
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (title) => [`category-${title}`],
  { revalidate: revalidationTime }
);

// Get siteInfo
export const getSiteInfo = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/settings/`);
      resObj.data = await response.json();
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['site-info'],
  { revalidate: revalidationTime }
);

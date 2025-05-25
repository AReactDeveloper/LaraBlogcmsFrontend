import { unstable_cache } from 'next/cache';

const revalidationTime = 1;
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Helper to standardize fetch options
const fetchOptions = {
  headers: { 'Accept': 'application/json' },
  credentials: 'include', // remove this line if your API does not use cookies/auth
};

// List all articles
export const getArticles = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await fetch(`${API_BASE}/api/articles`, fetchOptions);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = (await response.json()) || [];
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
      const response = await fetch(`${API_BASE}/api/pages`, fetchOptions);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = (await response.json()) || [];
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
      const response = await fetch(`${API_BASE}/api/pages/${slug}`, fetchOptions);
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
      const response = await fetch(`${API_BASE}/api/articles/${slug}`, fetchOptions);
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
      const response = await fetch(`${API_BASE}/api/categories`, fetchOptions);
      if (!response.ok) throw new Error(await response.text());
      resObj.data = (await response.json()) || [];
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
      const response = await fetch(`${API_BASE}/api/tags`, fetchOptions);
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
      const response = await fetch(`${API_BASE}/api/tags/${title}`, fetchOptions);
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
      const response = await fetch(`${API_BASE}/api/categories/${title}`, fetchOptions);
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
      const response = await fetch(`${API_BASE}/api/settings`, fetchOptions);
      if (!response.ok) throw new Error(await response.text());
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

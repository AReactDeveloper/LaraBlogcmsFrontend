import { unstable_cache } from 'next/cache';
import axiosInstance from "./axios";

const revalidationTime = 60 * 60;

// List all articles
export const getArticles = unstable_cache(
  async () => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/articles');
      resObj.data = response.data || [];
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['articles'], // unchanged, already dash style
  { revalidate: revalidationTime } // cache for 1 hour
);

// List all Pages
export const getPages = unstable_cache(
  async () => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/pages/');
      resObj.data = response.data || [];
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['pages'], // unchanged, already dash style
  { revalidate: revalidationTime } // cache for 1 hour
);

// Get a single page by slug
export const getPageBySlug = unstable_cache(
  async (slug) => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/pages/' + slug);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (slug) => [`article-${slug}`], // updated tag format
  { revalidate: revalidationTime } // cache for 1 hour
);

// Get a single article by slug
export const getArticleBySlug = unstable_cache(
  async (slug) => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/articles/' + slug);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (slug) => [`article-${slug}`], // updated tag format
  { revalidate: revalidationTime } // cache for 1 hour
);



// Get a list of all categories
export const getCategories = unstable_cache(
  async () => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/categories/');
      resObj.data = response.data || [];
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['categories'], // unchanged, dash style already
  { revalidate: revalidationTime } // cache for 1 hour
);

// Get a list of all tags
export const getTags = unstable_cache(
  async () => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/tags/');
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['tags'], // unchanged, dash style already
  { revalidate: revalidationTime } // cache for 1 hour
);

// Get tag by title
export const getTagByTitle = unstable_cache(
  async (title) => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/tags/' + title);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (title) => [`tag-${title}`], // updated tag format
  { revalidate: revalidationTime } // cache for 1 hour
);

// Get category by title
export const getCategoryByTitle = unstable_cache(
  async (title) => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/categories/' + title);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (title) => [`category-${title}`], // updated tag format
  { revalidate: revalidationTime } // cache for 1 hour
);

// Get siteInfo
export const getSiteInfo = unstable_cache(
  async () => {
    const resObj = { data: {}, error: '', loading: true };
    try {
      const response = await axiosInstance.get('/api/settings/');
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['site-info'], // updated from 'siteInfo' to dash style 'site-info'
  { revalidate: revalidationTime } // cache for 1 minute
);

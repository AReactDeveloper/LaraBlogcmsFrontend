import { unstable_cache } from 'next/cache';
//unstable_cache caches expensive operations to boost performance.
import axiosInstance from "./axios";

// List all articles
export const getArticles = unstable_cache(
  async () => {
    const resObj = { data: null, error: null, loading: true };
    try {
      const response = await axiosInstance.get('/api/articles');
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error;
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['articles'],
  { revalidate: 3600 } // cache for 1 hour
);

// Get a single article by slug
export const getArticleBySlug = unstable_cache(
  async (slug) => {
    const response = await axiosInstance.get('/api/articles/' + slug);
    return response.data;
  },
  (slug) => ['article', slug],
  { revalidate: 3600 } // cache for 1 hour
);

// Get a list of all categories
export const getCategories = unstable_cache(
  async () => {
    const resObj = { data: null, error: null, loading: true };
    try {
      const response = await axiosInstance.get('/api/categories/');
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error;
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['categories'],
  { revalidate: 3600 } // cache for 1 hour
);

// Get a list of all tags
export const getTags = unstable_cache(
  async () => {
    const resObj = { data: null, error: null, loading: true };
    try {
      const response = await axiosInstance.get('/api/tags/');
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error;
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['tags'],
  { revalidate: 3600 } // cache for 1 hour
);

// Get tag by title
export const getTagByTitle = unstable_cache(
  async (title) => {
    const resObj = { data: null, error: null, loading: true };
    try {
      const response = await axiosInstance.get('/api/tags/' + title);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error;
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (title) => ['tag', title],
  { revalidate: 3600 } // cache for 1 hour
);

// Get category by title
export const getCategoryByTitle = unstable_cache(
  async (title) => {
    const resObj = { data: null, error: null, loading: true };
    try {
      const response = await axiosInstance.get('/api/categories/' + title);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error;
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (title) => ['category', title],
  { revalidate: 3600 } // cache for 1 hour
);

// Get siteInfo
export const getSiteInfo = unstable_cache(
  async () => {
    const resObj = { data: null, error: null, loading: true };
    try {
      const response = await axiosInstance.get('/api/settings/');
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error;
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['siteInfo'],
  { revalidate: 99999999 } // cache for eternity
);
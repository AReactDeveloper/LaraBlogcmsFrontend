import { unstable_cache } from 'next/cache';
import axiosInstance from './axios';

const revalidationTime = 3600;

// List all articles
export const getArticles = unstable_cache(
  async () => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const res = await axiosInstance.get('/api/articles')
      if(res){
        resObj.data = res.data
      }
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
      const response = await axiosInstance.get('/api/pages');
      resObj.data = response.data || [];
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
      const response = await axiosInstance.get(`/api/pages/${slug}`);
      resObj.data = response.data;
    } catch (error) {
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  (slug) => [`page-${slug}`],
  { revalidate: revalidationTime }
);

// Get a single article by slug
export const getArticleBySlug = unstable_cache(
  async (slug) => {
    const resObj = { data: [], error: '', loading: true };
    try {
      const response = await axiosInstance.get(`/api/articles/${slug}`);
      resObj.data = response.data;
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
      const response = await axiosInstance.get('/api/categories');
      resObj.data = response.data || [];
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
      const response = await axiosInstance.get('/api/tags');
      resObj.data = response.data || [];
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
      const response = await axiosInstance.get(`/api/tags/${title}`);
      resObj.data = response.data;
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
      const response = await axiosInstance.get(`/api/categories/${title}`);
      resObj.data = response.data;
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
      const response = await axiosInstance.get('/api/settings');
      resObj.data = response.data;
    } catch (error) {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      resObj.error = error?.message || 'Unknown error';
    } finally {
      resObj.loading = false;
    }
    return resObj;
  },
  ['site-info'],
  { revalidate: revalidationTime }
);
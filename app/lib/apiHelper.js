import axiosInstance from "./axios";

// List all articles
export const getArticles = async () => {
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
};

// Get a single article by slug
export const getArticleBySlug = async (slug) => {
    const resObj = { data: null, error: null, loading: true };
    try {
        const response = await axiosInstance.get('/api/articles/' + slug);
        resObj.data = response.data;
    } catch (error) {
        resObj.error = error;
    } finally {
        resObj.loading = false;
    }
    return resObj;
};

// Get a list of all categories
export const getCategories = async () => {
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
};

// Get a list of all tags
export const getTags = async () => {
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
};

// Get tag by title
export const getTagByTitle = async (title) => {
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
};

// Get category by title
export const getCategoryByTitle = async (title) => {
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
};

// Delete category by id
export const deleteCategoryById = async (id) => {
    const resObj = { data: null, error: null, loading: true };
    try {
        const response = await axiosInstance.delete('/api/categories/' + id);
        resObj.data = response.data;
    } catch (error) {
        resObj.error = error;
    } finally {
        resObj.loading = false;
    }
    return resObj;
};

// Get siteInfo
export const getSiteInfo = async () => {
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
};

// Get all attachments
export const getAttachments = async () => {
    const resObj = { data: null, error: null, loading: true };
    try {
        const response = await axiosInstance.get('/api/file/');
        resObj.data = response.data;
    } catch (error) {
        resObj.error = error;
    } finally {
        resObj.loading = false;
    }
    return resObj;
};

// Get attachment by id
export const getAttachmentById = async (id) => {
    const resObj = { data: null, error: null, loading: true };
    try {
        const response = await axiosInstance.get('/api/file/' + id);
        resObj.data = response.data;
    } catch (error) {
        resObj.error = error;
    } finally {
        resObj.loading = false;
    }
    return resObj;
};

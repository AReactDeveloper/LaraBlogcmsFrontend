import axiosInstance from "./axios";

//List all articles
export const getArticles = async ()=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/articles')
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}


//Get a single article by slug
export const getArticleBySlug = async (slug)=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/articles/' + slug)
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}

//Get a list of all categories
export const getCategories = async ()=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/categories/')
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}

//Get category by id
export const getCategoryById = async (id)=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/categories/'+id)
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}

//Get category by id
export const deleteCategoryById = async (id)=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.delete('/api/categories/'+id)
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}


//Get siteInfo 
export const getSiteInfo = async ()=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/settings/')
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}


//get all attachements (only images supported thusfar)
export const getAttachments = async ()=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/file/')
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}

//get all attachements (only images supported thusfar)
export const getAttachmentById = async (id)=>{
    const resObj = {
        data : null,
        error: null
    }

    try{
        const response = await axiosInstance.get('/api/file/'+id)
        resObj.data = response.data
    } catch(error){
        resObj.error = error
    }

    return resObj;
}
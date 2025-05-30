import React, { useState } from 'react'
import postEditCategory from '../(Actions)/postEditCategory';
import Spinner from '../../components/Utility/Spinner';

export default function EditCategory({currentEdit}) {

    const [title, setTitle] = useState(currentEdit.title);
    const [description, setDescription] = useState(currentEdit.description);
    const [message, setMessage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleCategoryAdd = async (e) => {
        e.preventDefault();
        setLoading(true)
        setMessage(null);
        setErrorMsg(null);
    
        if (!title.trim()) {
          setErrorMsg('Title is required');
          return;
        }
    
        const payload = {
          title: title.trim(),
          description: description.trim() || null,
        };
    
        try {
          setLoading(true);
          const result = await postEditCategory(payload,currentEdit.id); //
    
          if (result.statusCode === 200) {
            setMessage(result.message);
          } else {
            setErrorMsg(result.message);
          }
        } catch (e) {
          console.log(e);
          setErrorMsg('Something went wrong.');
        } finally {
          setLoading(false);
        }
      };
    

    return (
        <>
        {loading && <Spinner />}
        {message && <div className='success'>{message} <button onClick={()=>setMessage('')}>X</button></div>}
        {errorMsg && <div className='error'>{errorMsg} <button onClick={()=>setErrorMsg('')}>X</button></div>}
            
        <h2>Edit Category:</h2>
        <form className="formContainer" onSubmit={handleCategoryAdd}>
        <div className="form-control">
        <label htmlFor="category-name">Category Name</label>
        <input
        type="text"
        id="category-name"
        name="category-name"
        placeholder="Enter category name"
        aria-required="true"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="category-description">Description</label>
        <textarea
        id="category-description"
        name="category-description"
        placeholder="Enter category description"
        aria-required="true"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        </div>
            <button type="submit" disabled={loading}>
                Edit category
            </button>
        </form>
        </>
    )
}

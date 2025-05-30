'use client';

import { useState } from 'react';
import postAddCategory from '../(Actions)/postAddCategory';
import Spinner from '../../components/Utility/Spinner';

export default function AddCategoryForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
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
      const result = await postAddCategory(payload);

      if (result.statusCode === 200) {
        setMessage(result.message);
        setTitle('');
        setDescription('');
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
    <div>
      {loading && <Spinner />}
      {message && <div className='success'>{message} <button onClick={()=>setMessage('')}>X</button></div>}
      {errorMsg && <div className='error'>{errorMsg} <button onClick={()=>setErrorMsg('')}>X</button></div>}


      <h2>Add Category:</h2>
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
          Add category
        </button>
      </form>
    </div>
  );
}

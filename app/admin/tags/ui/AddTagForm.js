'use client';

import { useState } from 'react';
import Spinner from '../../components/Utility/Spinner';
import postAddTag from '../(Actions)/postAddTag';

export default function AddTagForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTagAdd = async (e) => {
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
      const result = await postAddTag(payload);

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


      <h2>Add Tag:</h2>
      <form className="formContainer" onSubmit={handleTagAdd}>
        <div className="form-control">
          <label htmlFor="Tag-name">Tag Name</label>
          <input
            type="text"
            id="Tag-name"
            name="Tag-name"
            placeholder="Enter Tag name"
            aria-required="true"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="Tag-description">Description</label>
          <textarea
            id="Tag-description"
            name="Tag-description"
            placeholder="Enter Tag description"
            aria-required="true"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Add Tag
        </button>
      </form>
    </div>
  );
}

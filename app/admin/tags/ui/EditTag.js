import React, { useState } from 'react'
import Spinner from '../../components/Utility/Spinner';
import postEditTag from '../(Actions)/postEditCategory';
import { useRouter } from 'next/navigation';

export default function EditTag({currentEdit}) {

    const [title, setTitle] = useState(currentEdit.title);
    const [description, setDescription] = useState(currentEdit.description);
    const [message, setMessage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter()


    const handleEditAdd = async (e) => {
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
          const result = await postEditTag(payload,currentEdit.id); //
    
          if (result.statusCode === 200) {
            setMessage(result.message);
          } else {
            setErrorMsg(result.message);
          }
          router.refresh()

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
            
        <h2>Edit Tag:</h2>
        <form className="formContainer" onSubmit={handleEditAdd}>
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
                Edit Tag
            </button>
        </form>
        </>
    )
}

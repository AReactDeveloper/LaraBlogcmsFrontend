'use client'
import React, { useState } from 'react'
import postAddArticle from './AddAction'
import Spinner from '../../components/Utility/Spinner'

export default function AddForm() {

  const [loading,setLoading] = useState(true)
  const [message,setMessage] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const title = formData.get('title')?.trim() || ''
    const content = formData.get('content')?.trim() || ''
    if(!title || !content){
      setErrorMsg('please fil in all required inputs')
      return
    }
    try{
      setLoading(true);
      const result = await postAddArticle(formData); 
      setLoading(false);
      setMessage(result);
      }catch(e){
        console.log(e)
        setErrorMsg('there was an error while Adding you article')
      }
  };
  
  if(loading){
    <Spinner />
  }

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      {message ? <div className='success'>{message}</div>  : ''}
      {errorMsg ? <div className='error'>{errorMsg}</div>  : ''}
      <div className="form-control">
        <label htmlFor="title">Article Title:</label>
        <input
          type="text"
          name="title"
        />
      </div>

      <div className="form-control">
        <label htmlFor="content">Article Content:</label>
        <textarea
          name="content"
        />
      </div>

      
      <button type="submit">Add Article</button>
    </form>
  )
}

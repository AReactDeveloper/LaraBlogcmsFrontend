'use client'
import React, { useState } from 'react'
import postAddArticle from './AddAction'
import Spinner from '../../components/Utility/Spinner'
import { useRouter } from 'next/navigation'

export default function AddForm() {

  const MyEditor = dynamic(() => import('@/app/utils/Editor/MyEditor'), { ssr: false })


  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)
  const [editorOutput, setEditorOutput] = useState('');

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const title = formData.get('title')
    const content = formData.get('content')
    if(!title || !content){
      setErrorMsg('please fil in all required inputs')
      return
    }
    try{
      setLoading(true);
      const result = await postAddArticle(formData); 
      setMessage(result);
      router.push('/admin/articles')
      setLoading(false);
      }catch(e){
        console.log(e)
        setErrorMsg('there was an error while Adding you article')
      }
  };

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
        <MyEditor setEditorOutput={setEditorOutput} />
        <input type="hidden" value={editorOutput} name='content' />
      </div>

      
      <button type="submit">
        {loading ? (
          <>
            Add Article <Spinner />
          </>
        ) : (
          'Add Article'
        )}
      </button>    
</form>
  )
}

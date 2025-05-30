'use client'

import React, { useState } from 'react'
import postAddPage from '../Actions/AddPageAction.js'
import Spinner from '../../components/Utility/Spinner'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import('@/app/utils/Editor/MyEditor'), { ssr: false })

export default function AddPageForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [editorOutput, setEditorOutput] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const title = formData.get('title')

    if (!title || !editorOutput) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    const pageData = {
      title,
      content: editorOutput,
    }

    try {
      setLoading(true)
      setErrorMsg(null)
      setMessage(null)

      const result = await postAddPage(pageData)

      if (result.statusCode !== 200) {
        setErrorMsg(result.message)
        return
      }

      setMessage(result.message)
      router.push('/admin/pages')
    } catch (e) {
      console.error(e)
      setErrorMsg('There was an error while adding your page.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      {message && <div className="success">{message}</div>}
      {errorMsg && <div className="error">{errorMsg}</div>}

      <div className="form-control">
        <label htmlFor="title">Page Title:</label>
        <input type="text" name="title" id="title" required />
      </div>

      <div className="form-control">
        <label htmlFor="content">Page Content:</label>
        <MyEditor setEditorOutput={setEditorOutput} />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            Add Page <Spinner />
          </>
        ) : (
          'Add Page'
        )}
      </button>
    </form>
  )
}

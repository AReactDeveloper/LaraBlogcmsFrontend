'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import editPageAction from '../../Actions/editPageAction.js'
import axiosInstance from '@/app/lib/axios.js'
import Spinner from '@/app/admin/components/Utility/Spinner.js'

const MyEditor = dynamic(() => import('@/app/utils/Editor/MyEditor'), { ssr: false })

export default function AddPageForm() {
    const params = useParams();
    const slug = params.slug;

    const [loading, setLoading] = useState(false)
    const [Pageloading, setPageLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [editorOutput, setEditorOutput] = useState('')
    const [page,setPage] = useState()

    const router = useRouter()

    //fetch page content
    useEffect(()=>{
        const getPage = async(slug)=>{
            setPageLoading(true)
        const res = await axiosInstance.get('/api/pages/'+ slug)
        if(res){
            setPage(res.data)
            setEditorOutput(res.data.content)
        }
        else{
            setPage([])
        }
        setPageLoading(false)
        }
        getPage(slug)
    },[slug])

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

        const result = await editPageAction(page.id ,pageData)

        if (result.statusCode !== 200) {
            setErrorMsg(result.message)
            return
        }

        setMessage(result.message)
        router.push('/admin/pages')
        } catch (e) {
        console.error(e)
        setErrorMsg('There was an error while editing your page.')
        } finally {
        setLoading(false)
        }
    }

    if(Pageloading) { return <Spinner />}

    return (
        <form className="formContainer" onSubmit={handleSubmit}>
        {message && <div className="success">{message}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}

        <div className="form-control">
            <label htmlFor="title">Page Title:</label>
            <input defaultValue={page?.title ||''} type="text" name="title" id="title" required />
        </div>

        <div className="form-control">
            <label htmlFor="content">Page Content:</label>
            <MyEditor content={page?.content || ''} setEditorOutput={setEditorOutput} />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? (
            <>
                Edit Page <Spinner />
            </>
            ) : (
            'Edit Page'
            )}
        </button>
        </form>
    )
    }

'use client'

import React, { use, useEffect, useId, useState } from 'react'
import postAddArticle from '../(actions)/AddAction'
import Spinner from '../../components/Utility/Spinner'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosCloseCircle } from 'react-icons/io'
import fileUploadAction from '../(actions)/FileUploadAction'
import axiosInstance from '@/app/lib/axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';


const MyEditor = dynamic(() => import('@/app/utils/Editor/MyEditor'), { ssr: false })

export default function AddForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [editorOutput, setEditorOutput] = useState('')
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [tbuFile, setTbuFile] = useState(null)
  const [fileLoading, setFileLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([0]) //default option uncategorized
  const [selectedTags, setSelectedTags] = useState([])
  const [isDraft,setIsDraft] = useState()

  const [catLoading,setCatLoading] = useState(false)
  const [tagLoading,setTagLoading] = useState(false)

  const router = useRouter()

  const id = useId(); {/* fix for react hydration errror */}


  useEffect(() => {
    const getCategories = async () => {
      setCatLoading(true)
      const res = await axiosInstance.get('/api/categories')
      const categoryOptions = res.data.map(category => ({
        value: category.id,       
        label: category.title     
      }));
      setCategories(categoryOptions)
      setSelectedCategory(categoryOptions[0])
      setCatLoading(false)
    }

    const getTags = async () => {
      setTagLoading(true)
      const res = await axiosInstance.get('/api/tags')
      setTags(res.data)
      setTagLoading(false)
    }

    getCategories()
    getTags()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
  
    const articleData = {
      title: title,
      content: editorOutput,
      excerpt : excerpt,
      category_id: selectedCategory.value,
      imgUrl  : tbuFile || null,
      tags: selectedTags.map(tag=>tag.label) || null, 
      isDraft:isDraft ? 1 : 0
    };
    console.log(articleData)

    console.log(selectedTags.map(tag=>tag.label))

    if (!title || !editorOutput) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
  
    formData.set('content', editorOutput);
  
    if (selectedCategory) {
      formData.set('category_id', selectedCategory.value);
    }
  
    if (tbuFile) {
      formData.set('imgUrl', tbuFile);
    }
  
    formData.append('tags',JSON.stringify(selectedTags.map(tag=>{
      return tag.label
    })))

    try {
      setLoading(true);
      setErrorMsg(null);
      setMessage(null);
  
      const result = await postAddArticle(articleData);
  
      if (result.statusCode !== 200) {
        setErrorMsg(result.message);
        return;
      }
  
      setMessage(result.message);
      router.push('/admin/articles');
    } catch (e) {
      console.error(e);
      setErrorMsg('There was an error while adding your article.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleFileUpload = async (e) => {
    const securedFile = e.target.files[0]

    if (!securedFile) {
      setErrorMsg('No file selected')
      return
    }

    if (!securedFile.type.startsWith('image/')) {
      setErrorMsg('Only image files are allowed.')
      return
    }

    try {
      setFileLoading(true)
      setErrorMsg(null)
      setMessage(null)

      const res = await fileUploadAction(securedFile)
      if (res.success) {
        setMessage(res.message)
        setTbuFile(res.url)
      } else {
        setErrorMsg(res.message || 'Unknown error during file upload')
      }
    } catch (error) {
      setErrorMsg('There was an error while uploading your file')
    } finally {
      setFileLoading(false)
    }
  }

  const openPanel = () => setIsPanelOpen(true)
  const closePanel = () => setIsPanelOpen(false)

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      {message && <div className="success">{message}</div>}
      {errorMsg && <div className="error">{errorMsg}</div>}

      <button type="button" className="open-btn" onClick={openPanel}>
        <GiHamburgerMenu size={30} />
      </button>

      <div
        id="mySidePanel"
        className="side-panel"
        style={{ width: isPanelOpen ? '30%' : '0' }}
      >
        <span className="close-btn" onClick={closePanel}>
          <IoIosCloseCircle />
        </span>
        <div className="side-content">
          <div className="form-control">
            <label htmlFor="imgUrl">Featured Image:</label>
            {fileLoading ? (
              <Spinner />
            ) : tbuFile ? (
              <>
                <img src={tbuFile} alt="Uploaded preview" />
                <button type="button" onClick={() => setTbuFile(null)}>
                  Delete
                </button>
                <input
                  type="hidden"
                  name="imgUrl"
                  id="imgUrl"
                  value={tbuFile}
                  readOnly
                />
              </>
            ) : (
              <input
                type="file"
                name="file"
                id="imgUrl"
                onChange={handleFileUpload}
                accept="image/*"
              />
            )}
          </div>

          <div className="form-control">
            <label htmlFor="category">Category:</label>
            <Select
            instanceId={id} 
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              defaultValue={selectedCategory}
              isLoading={catLoading}
              isDisabled={catLoading}
            />
          </div>


          <div className="form-control">
            <label htmlFor="tags">Tags:</label>
            <CreatableSelect
              instanceId={id}
              isMulti
              isClearable={true}
              options={tags.map(tag => ({ value: tag.id, label: tag.title }))}
              onChange={setSelectedTags}
              isLoading={tagLoading}
              isDisabled={tagLoading}
              value={selectedTags}
            />
          </div>

          <div className="form-control">
            <label htmlFor="excerpt">Excerpt:</label>
            <textarea name="excerpt" id="excerpt"  />
          </div>

          <div className="form-control">
            <label htmlFor="draft">Publish Now:</label>
            <select id='draft' onChange={(e) => setIsDraft(e.target.value === '1')}>
              <option value="0">No, Publish</option>
              <option value="1">Yes, Save as draft</option>
            </select>

          </div>

        </div>
      </div>

      <div className="form-control">
        <label htmlFor="title">Article Title:</label>
        <input type="text" name="title" id="title" required />
      </div>

      <div className="form-control">
        <label htmlFor="content">Article Content:</label>
        <MyEditor setEditorOutput={setEditorOutput} />
      </div>

      <button type="submit" disabled={loading}>
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

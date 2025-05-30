'use client'

import axiosInstance from "@/app/lib/axios"
import { React, useEffect, useState } from "react"
import Spinner from "../../components/Utility/Spinner"
import deleteCategory from "../(Actions)/deleteCategory"
import Modal from "@/app/(site)/components/default/ui/Modal/Modal"
import EditCategory from "./EditCategory"

export default function CategoriesTable() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [intialCount,setIntialCount] = useState(5)
  const [message,setMessage] = useState('')
  const [error,setError] = useState('')
  const [editOpen,setEditOpen] = useState(false)

  const [currentEdit,setCurrentEdit] = useState()

  // Get categories
  useEffect(() => {
    const getCats = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/api/categories')
        if (res) {
          setCategories(res.data)
        }
      } catch (e) {
        console.log(e)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    getCats()
  }, [])

  const handleCategoryDelete  = async(id) =>{
    setLoading(true)
    //reset
    setMessage('')
    setError('')
    const res = await deleteCategory(id)
    if(res.statusCode == 200){
      setMessage(res.message)
    }
    if(res.statusCode == 400){
      setError(res.message)
    }
    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
    <Modal title={'Edit'} isOpen={editOpen}  onClose={()=>setEditOpen(false)}>
      <EditCategory currentEdit={currentEdit ?? currentEdit} />
    </Modal>
    {message && <div className='success'>{message} <button onClick={()=>setMessage('')}>X</button></div>}
    {error && <div className='error'>{error} <button onClick={()=>setError('')}>X</button></div>}
    <div>
      <h3>Categories List :</h3>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories?.slice(0,intialCount).map((cat) => (
              <tr key={cat.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <a href="#" className="post-title">{cat.title}</a>
                  <div className="row-actions">
                    <button onClick={()=>{
                      setEditOpen(true)
                      setCurrentEdit(cat)
                    }} className='btnLink'><span>edit</span></button>
                    <button onClick={()=>handleCategoryDelete(cat.id)} className='btnLink'><span>trash</span></button>
                  </div>
                </td>
                <td>{cat.description ? cat.description?.slice(0,50) + '...' : 'no description'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {intialCount < categories.length && (
        <button className='btnLink' onClick={() => setIntialCount(prev => prev + intialCount)}>Load More</button>
      )}
      {intialCount >= categories.length ? (
        <button className='btnLink' onClick={()=>setIntialCount(5)}>reset</button>
      ) : ''}
    </div>
    </>
  )
}

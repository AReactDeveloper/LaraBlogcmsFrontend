'use client'

import axiosInstance from "@/app/lib/axios"
import { React, useEffect, useState } from "react"
import Spinner from "../../components/Utility/Spinner"
import Modal from "@/app/(site)/components/default/ui/Modal/Modal"
import deleteTag from "../(Actions)/deleteTag"
import EditTag from "./EditTag"

export default function TagsTable() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [intialCount,setIntialCount] = useState(5)
  const [message,setMessage] = useState('')
  const [error,setError] = useState('')
  const [editOpen,setEditOpen] = useState(false)

  const [currentEdit,setCurrentEdit] = useState()

  // Get tags
  useEffect(() => {
    const getTags = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/api/tags')
        if (res) {
          setTags(res.data)
        }
      } catch (e) {
        console.log(e)
        setTags([])
      } finally {
        setLoading(false)
      }
    }
    getTags()
  }, [])

  const handleTagDelete  = async(id) =>{
    //reset
    setTags(prev => prev.filter(tag => tag.id !== id)) // Remove deleted item
    setMessage('deleting ...')
    setError('')
    const res = await deleteTag(id)
    if(res.statusCode == 200){
      setMessage(res.message)
    }
    if(res.statusCode == 400){
      setError(res.message)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
    <Modal title={'Edit'} isOpen={editOpen}  onClose={()=>setEditOpen(false)}>
      <EditTag  currentEdit={currentEdit ?? currentEdit} />
    </Modal>
    {message && <div className='success'>{message} <button className='btnLink' onClick={()=>setMessage('')}>X</button></div>}
    {error && <div className='error'>{error} <button className='btnLink' onClick={()=>setError('')}>X</button></div>}
    <div>
      <h3>Tags List :</h3>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tags.length > 0 ? (
            tags?.slice(0,intialCount).map((tag) => (
              <tr key={tag.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <a href="#" className="post-title">{tag.title}</a>
                  <div className="row-actions">
                    <button onClick={()=>{
                      setEditOpen(true)
                      setCurrentEdit(tag)
                    }} className='btnLink'><span>edit</span></button>
                    <button onClick={()=>handleTagDelete(tag.id)} className='btnLink'><span>trash</span></button>
                  </div>
                </td>
                <td>{tag.description ? tag.description?.slice(0,50) + '...' : 'no description'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Tags found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {intialCount < tags.length && (
        <button className='btnLink' onClick={() => setIntialCount(prev => prev + intialCount)}>Load More</button>
      )}
      {intialCount >= tags.length ? (
        <button className='btnLink' onClick={()=>setIntialCount(5)}>reset</button>
      ) : ''}
    </div>
    </>
  )
}

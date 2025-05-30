'use client'
import axiosInstance from '@/app/lib/axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Utility/Spinner'
import styles from './styles/fileGrid.module.scss'
import { FaLink } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import deleteFileAction from '../(Action)/deleteFileAction'

export default function FileGrid() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [qMessage, setQMessage] = useState(null);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await axiosInstance.get('/api/file')
        setFiles(res.data)
      } catch (err) {
        console.error('Error fetching files:', err)
      } finally {
        setLoading(false)
      }
    }
    getFiles()
  }, [])
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link)
        .then(() => {
        alert('Link copied to clipboard!');
        })
        .catch(err => {
        console.error('Failed to copy: ', err);
    });
  }
  
  const handleDeleteFile = async(id)=>{
    setFiles(prev => prev.filter(file => file.id !== id));
    setQMessage('deleting file from server please dont close this page...')
    const res = await deleteFileAction(id)
    if(res.statusCode == 200){
        setMessage(res.message)
        setQMessage('')
    }
    if(res.statusCode == 400){
        setError(res.message)
        setQMessage('')
    }
  }

  if (loading) return <Spinner />
  if (!files.length) return <div className="error">No Files found.</div>;


  return (
    <>
    {qMessage && <div className="qMsg">{qMessage}</div>}
    {message && <div className="success">{message}</div>}
    {error && <div className="error">{error}</div>}

    <div className={styles.FileGrid}>
      {files.map((file) => (
        <div className={styles.imgDiv} key={file.id || file.url}>
          <Image
            src={file.url || '/default.jpg'}
            width={500}
            height={500}
            alt="file"
          />
          <div className={styles.overlay}>
            <button onClick={()=>handleDeleteFile(file.id)}>
                <MdDelete size={24} />
            </button>
            <button onClick={()=>copyToClipboard(file.url)} >
                <FaLink size={24} />
            </button>
        </div>
        </div>
      ))}
    </div>
    </>
  )
}

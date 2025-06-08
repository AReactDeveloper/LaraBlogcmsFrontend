'use client'
import { useEffect, useState } from 'react'
import styles from './themeform.module.scss'
import postToSettings from '../../settings/settingsAction'
import other from '@/app/(site)/components/other/other.png'
import defaultImg from '@/app/(site)/components/default/default.png'
import axiosInstance from '@/app/lib/axios'

export default function ThemeForm() {
    
    const [theme, setTheme] = useState('')
    const [message, setMessage] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [qmsg, setQmsg] = useState('')
    const [loading, setLoading] = useState('')

    useEffect(()=>{
      const getheme = async()=> {
        const res = await axiosInstance.get('/api/settings');
        if(res){
          setTheme(res.data.siteTheme)
        }
      }
      getheme()
    },[])

    const handleChange = (e) => {
      setTheme(e.target.value)
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      const data = {
        siteTheme	: theme
      }
      setLoading(true)
      setQmsg('setting up your theme ... please wait')
      const res = await postToSettings(data); 
      if(res.statusCode == 200){
        setErrorMsg('')
        setQmsg('')
        setMessage('Theme was updated successfully');
        setLoading(false)
      }
      if(res.statusCode == 400){
        setMessage('')
        setQmsg('')
        setErrorMsg('There was an error setting ur theme')
        setLoading(false)
      }
      setLoading(false);
    }

    return (
      <>
      {loading ? <div className='qMsg'>{qmsg}</div>  : ''}
      {message ? <div className='success'>{message}</div>  : ''}
      {errorMsg ? <div className='error'>{errorMsg}</div>  : ''}
      <form onSubmit={handleSubmit} className={styles.ThemeForm}>
        <div className={styles.ThemeFormInner}>
          <div>
            <img src={other.src} />
            <h2>Other Theme</h2>
            <input
              type='checkbox'
              value={'other'}
              onChange={handleChange}
              checked={theme === 'other'}
            />
          </div>
          <div>
            <img src={defaultImg.src} />
            <h2>Default Theme</h2>
            <input
              type='checkbox'
              value={'default'}
              onChange={handleChange}
              checked={theme === 'default'}
            />
          </div>
        </div>
        <button>Apply</button>
      </form>
    </>
    )
}

'use client';
import  postToSettings  from '../settingsAction';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios';
import Spinner from '../../components/Utility/Spinner';

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [siteInfo, setSiteInfo] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/api/settings');
        setSiteInfo(res.data);
        setLoading(false);
      } catch (err) {
        setErrorMsg('Error fetching site info');
      }
    };

    fetchData();
    console.log(loading)
  }, []);

  useEffect(() => {
    if (message || errorMsg) {
      const timer = setTimeout(() => {
        setMessage(null);
        setErrorMsg(null);
      }, 100000);
      return () => clearTimeout(timer);
    }
  }, [message, errorMsg]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
      setLoading(true);
      const form = event.target;
      const data = {
        siteName: form.siteName.value,
        siteDescription: form.siteDescription.value,
        sitePostsPerPage: Number(form.sitePostsPerPage.value),
      };
      const res = await postToSettings(data); 
      if(res.statusCode == 200){
        const siteInfo = await axiosInstance.get('/api/settings/');
        setSiteInfo(siteInfo.data);
        setErrorMsg('')
        setMessage(res.message);
      }
      if(res.statusCode == 400){
        setMessage('')
        setErrorMsg(res.message)
      }
      setLoading(false);

  };

  if (loading) return <Spinner />;

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      {message ? <div className='success'>{message}</div>  : ''}
      {errorMsg ? <div className='error'>{errorMsg}</div>  : ''}
      <div className="form-control">
        <label htmlFor="siteName">Site Title:</label>
        <input
          type="text"
          name="siteName"
          defaultValue={siteInfo?.siteName || ''}
        />
      </div>

      <div className="form-control">
        <label htmlFor="siteDescription">Site Description:</label>
        <textarea
          name="siteDescription"
          defaultValue={siteInfo?.siteDescription || ''}
        />
      </div>

      <div className="form-control">
        <label htmlFor="sitePostsPerPage">Posts Per Page:</label>
        <input
          type="number"
          name="sitePostsPerPage"
          defaultValue={siteInfo?.sitePostsPerPage || 10}
        />
      </div>
      <button type="submit">Submit Changes</button>
    </form>
  );
}

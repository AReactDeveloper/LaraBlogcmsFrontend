"use client";

import axiosInstance from '@/app/lib/axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Utility/Spinner';

export default function SettingsForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    siteLogo: '',
    siteFavicon: '',
    sitePostsPerPage: 0,
    siteLogoOptions: '',
  });


  // Clear error and message after 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setError(null);
      setMessage(null);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [error, message]);

  // Populate formData from siteInfo
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/api/settings/');
        const siteInfo = res.data
        if (siteInfo) {
          setFormData({
            siteName: siteInfo.siteName || '',
            siteDescription: siteInfo.siteDescription || '',
            sitePostsPerPage: siteInfo.sitePostsPerPage || 0,
            siteLogo: siteInfo.siteLogo || '',
            siteFavicon: siteInfo.siteFavicon || '',
            siteLogoOptions: siteInfo.siteLogoOptions || '',
          });
          setLoading(false)
        }
      } catch (err) {
        console.error('Error fetching site info:', err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put('/api/settings/1', formData)
      .then((response) => {
        console.log(response);
        setMessage('Site info updated successfully');
      })
      .catch((error) => {
        console.log(error);
        setError('Something went wrong while updating the site info');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoDelete = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, siteLogo: '' }));
  };

  const handleFaviconDelete = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, siteFavicon: '' }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    const { name } = e.target;

    if (!file) {
      setError('No file selected');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await axiosInstance.post('/api/file', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          [name]: `${process.env.NEXT_PUBLIC_API_URL}/${res.data.url}`,
        }));
        setMessage(`Site ${name} uploaded successfully`);
      } else {
        setError('Something went wrong while uploading the file');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while uploading the file');
    }
  };

  const handleLogoOptionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      siteLogoOptions: e.target.value,
    }));
  };

  if(loading){
    return <Spinner />
  }

  return (
    <div className="siteInfo">
      {message && <p className="message-block">{message}</p>}
      {error && <p className="error-block">{error}</p>}

      <form className='formContainer' onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="siteTitle">Site Title:</label>
          <input
            onChange={handleChange}
            type="text"
            name="siteName"
            value={formData.siteName}
            placeholder="Site Title"
          />
        </div>

        <div className="form-control">
          <label htmlFor='siteDescription'>Site Description:</label>
          <textarea
            onChange={handleChange}
            name="siteDescription"
            value={formData.siteDescription}
            placeholder="Site Description"
          />
        </div>
        

        <div className="form-control">
          <label htmlFor="logoOptions">Select a Logo Option:</label>
          <select
            onChange={handleLogoOptionChange}
            id="logoOptions"
            value={formData.siteLogoOptions}
          >
            <option value="logo">Logo Only</option>
            <option value="logo_title">Logo and Title</option>
            <option value="logo_title_description">Logo, Title, and Description</option>
            <option value="title_description">Title and Description</option>
          </select>
        </div>

        <div className="col-grid">
          {formData.siteLogo ? (
            <div className="form-control">
              <label>Site Logo:</label>
              <img src={formData.siteLogo} alt="Logo" />
              <button onClick={handleLogoDelete}>remove</button>
            </div>
          ) : (
            <div className="form-control">
              <label>Site Logo:</label>
              <input
                onChange={handleFileUpload}
                type="file"
                name="siteLogo"
                accept="image/*"
              />
            </div>
          )}

          {formData.siteFavicon ? (
            <div className="form-control">
              <label>Site FavIcon:</label>
              <img src={formData.siteFavicon} alt="Favicon" />
              <button onClick={handleFaviconDelete}>remove</button>
            </div>
          ) : (
            <div className="form-control">
              <label>Site FavIcon:</label>
              <input
                onChange={handleFileUpload}
                type="file"
                name="siteFavicon"
                accept="image/*"
              />
            </div>
          )}
        </div>

        <div className="form-control">
          <label>Post Per Page:</label>
          <input
            onChange={handleChange}
            type="number"
            name="sitePostsPerPage"
            value={formData.sitePostsPerPage}
          />
        </div>

        <button type="submit">Submit changes</button>
      </form>
    </div>
  );
}

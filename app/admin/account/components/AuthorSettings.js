'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios';
import Spinner from '../../components/Utility/Spinner';
import UpdateUserAction from '../(actions)/UpdateUserAction';
import fileUploadAction from '../../articles/(actions)/FileUploadAction';

export default function AuthorSettings() {
  const [loading, setLoading] = useState(true);
  const [fileLoading, setFileLoading] = useState();
  const [author, setAuthor] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    name : '',
    about_me : '',
    avatar_link : ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get('/api/user');
        setAuthor(res.data);
        console.log(res.data)
        setFormData({
          name: res.data.user.name || '',
          about_me: res.data.user.about_me || '',
          avatar_link : res.data.user.avatar_link || ''
        });
        setLoading(false);
      } catch (err) {
        setErrorMsg('Error fetching Author data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (message || errorMsg) {
      const timer = setTimeout(() => {
        setMessage(null);
        setErrorMsg(null);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message, errorMsg]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      name: formData.name,
      about_me: formData.about_me,
      avatar_link:formData.avatar_link
    };

    const res = await UpdateUserAction(data);

    if (res.statusCode === 200) {
      setMessage(res.message);
      const user = await axiosInstance.get('/api/user');
      setAuthor(user.data);
      setFormData({
        name: user.data.user.name || '',
        about_me: user.data.user.about_me || '',
        avatar_link : user.data.user.avatar_link || ''

      });
      setErrorMsg('');
    } else if (res.statusCode === 400) {
      setMessage('');
      setErrorMsg(res.message);
    }

    setLoading(false);
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
        setFormData({...formData,avatar_link : res.url})
        console.log(res.url)
      } else {
        setErrorMsg(res.message || 'Unknown error during file upload')
      }
      } catch (error) {
        setErrorMsg('There was an error while uploading your file')
      } finally {
        setFileLoading(false)
      }
  }

  if (loading) return <Spinner />;

  return (
    <>
      <h2>Author Settings</h2>
      <form className="formContainer" onSubmit={handleSubmit}>
        {message && <div className="success">{message}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}

        <div className="form-control">
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Please enter your author's name"
          />
        </div>

        <div className="form-control">
          <label htmlFor="about_me">About me:</label>
          <textarea
            name="about_me"
            value={formData.about_me}
            onChange={(e) =>
              setFormData({ ...formData, about_me: e.target.value })
            }
            placeholder="Please enter a short author description"
          />
        </div>

        <div className="side-content">
          <div className="form-control">
            <label htmlFor="imgUrl">User Avatar:</label>
            {fileLoading ? (
              <Spinner />
            ) : formData.avatar_link ? (
              <>
                <img src={formData.avatar_link} alt="Uploaded preview" />
                <button type="button" onClick={() => setFormData({...formData,avatar_link:null})}>
                  Delete
                </button>
                <input
                  type="hidden"
                  name="imgUrl"
                  id="imgUrl"
                  value={formData.avatar_link}
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
        </div>

        

        <button type="submit">Submit Changes</button>
      </form>
    </>
  );
}

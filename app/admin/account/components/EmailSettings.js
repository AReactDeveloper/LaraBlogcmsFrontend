'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios';
import Spinner from '../../components/Utility/Spinner';
import UpdateUserAction from '../(actions)/UpdateUserAction';

export default function EmailSettings() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    email : '',
    confirmEmail :''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/api/user');
        console.log(res.data)
        setFormData({
          email: res.data.user.email || ''
        });
        setLoading(false);
      } catch (err) {
        setErrorMsg('Error fetching Admin Email');
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
    if(formData.email != formData.confirmEmail){
        setErrorMsg('email and confirmed email must match')
        return
    }
    setLoading(true);

    const data = {
      email: formData.email,
      confirmEmail :formData.confirmEmail
    };

    const res = await UpdateUserAction(data);

    if (res.statusCode === 200) {
      setMessage('email updated succufully');
      const user = await axiosInstance.get('/api/user');
      setFormData({
        email: user.data.user.email || '',
      });
      setErrorMsg('');
    } else if (res.statusCode === 400) {
      setMessage('');
      setErrorMsg(res.message);
    }
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <h2>Email Settings</h2>
      <form className="formContainer" onSubmit={handleSubmit}>
        {message && <div className="success">{message}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}

        <div className="form-control">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Please enter your new email"
          />
        </div>

        <div className="form-control">
          <label htmlFor="name">Confirm Email:</label>
          <input
            type="text"
            name="email"
            value={formData.confirmEmail}
            onChange={(e) =>
              setFormData({ ...formData, confirmEmail: e.target.value })
            }
            placeholder="Please confirm your new email"
          />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    </>
  );
}

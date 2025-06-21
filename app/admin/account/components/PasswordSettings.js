'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Utility/Spinner';
import UpdateUserAction from '../(actions)/UpdateUserAction';

export default function PasswordSettings() {
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword : '',
    new_password :'',
    new_password_confirmation :'',
  });

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
    if(formData.new_password != formData.new_password_confirmation){
        setErrorMsg('passwords dont match')
        return
    }
    setLoading(true);

    const data = {
      currentPassword: formData.currentPassword,
      new_password :formData.new_password,
      new_password_confirmation :formData.new_password_confirmation
    };

    const res = await UpdateUserAction(data);

    if (res.statusCode === 200) {
      setMessage('Password updated succufully');
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
          <label htmlFor="name">Old Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
          />
        </div>

        <div className="form-control">
          <label htmlFor="name">New Password:</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={(e) =>
              setFormData({ ...formData, new_password: e.target.value })
            }
          />
        </div>

        <div className="form-control">
          <label htmlFor="name">New Password Confirmed:</label>
          <input
            type="password"
            name="new_password_confirmation"
            value={formData.new_password_confirmation}
            onChange={(e) =>
              setFormData({ ...formData, new_password_confirmation: e.target.value })
            }
          />
        </div>

        <button type="submit">Change password</button>
      </form>
    </>
  );
}

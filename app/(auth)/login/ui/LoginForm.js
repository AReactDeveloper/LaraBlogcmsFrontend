'use client';

import { useState, useEffect, useTransition } from "react";
import styles from './login.module.scss';
import { FaChalkboardUser } from "react-icons/fa6";

export default function LoginForm({ action , loginError }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  useEffect(() => {
    setError(loginError)
  }, [loginError]);

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(() => {
      Promise.resolve(action(formData))
        .catch(err => setError("Something went wrong"));
    });
  }

  return (
    <>
      <div className={styles.loginDiv}>
        <form onSubmit={onSubmit}>
      {error && <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        backgroundColor: '#ffe6e6',
        color: '#a30000',
      }}>{error}</div>}
          <div className={styles.loginIcon}>
            <FaChalkboardUser size={100} />
          </div>
          <label>email: </label>
          <input name="email" type="email" required />
          <br />
          <label>password: </label>
          <input name="password" type="password" required />
          <br />
          <button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

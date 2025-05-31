import React from 'react'
import AutoLogout from './ui/AutoLogout'

export const metadata = {
  title: 'Logging Out...',
  description: 'Logging out and redirecting you to the login page.',
};


export default function LogoutPage() {
  return (
    <AutoLogout />
  )
}

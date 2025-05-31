import React from 'react'
import FileGrid from './ui/FileGrid'

export const metadata = {
  title: 'Files | Admin Dashboard',
  description: 'Manage, create, and edit your files in the admin dashboard.'
}

export default function page() {
  return (
    <>
      <div className="pageHead">
        <h1>
          Files:
        </h1>
        <p>Here you can manage, create, and edit your files</p>
      </div>
      <FileGrid />
    </>
  )
}

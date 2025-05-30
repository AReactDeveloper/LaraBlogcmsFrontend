import React from 'react'
import PagesTable from './ui/PagesTable'
import { IoIosAddCircle } from 'react-icons/io'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <div className="pageHead">
        <h1>
          Pages List:
          <Link className="header-button" href={'/admin/pages/add'}>
            Add New <IoIosAddCircle />
          </Link>
        </h1>
        <p>Here you can manage, create, and edit your pages</p>
      </div>
      <PagesTable />
    </div>
  )
}

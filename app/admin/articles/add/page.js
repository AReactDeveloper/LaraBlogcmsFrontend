'use client'

import Head from 'next/head'
import AddForm from './AddForm'

export default function Page() {
  return (
    <>
      <Head>
        <title>Add new Article</title>
        <meta name="description" content="" />
      </Head>

      <AddForm />
    </>
  )
}

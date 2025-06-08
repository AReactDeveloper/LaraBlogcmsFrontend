import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticleCardList({article}) {

  let firstParagraph
  try {
    const parsed = JSON.parse(article.content)
    firstParagraph = parsed.blocks.find(block => block.type === 'paragraph')
  } catch (err) {
    console.log('failed to parse')
  }

  return (
    <div className="col-lg-6 mb-4">
      <div className="card">
      <Link href={'/article/'+ article.slug}>
          <Image
            className="card-img-top"
            src={article.imgUrl}
            styles={{height:'100px'}}
            width={100}
            height={200}
            alt={article.title}
          />
        </Link>
        <div className="card-body">
        <div className="small text-muted">
              {new Date(article.created_at).toLocaleString()}
          </div>
          <h2 className="card-title h4">{article.title}</h2>
          <p className="card-text">
            {article.excerpt || firstParagraph}
          </p>
          <Link href={'/article/'+ article.slug} className="btn btn-primary" >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ArticleCardList.module.scss'

export default function ArticleCardList({article , isGrid}) {
  return (
    <div className={isGrid ?  styles.ArticleGridCard : styles.ArticleCard} >
        <div className={styles.ArticleCardImg}>
          <Image 
            src={article.imgUrl || '/default.jpg'} 
            alt={article.title}
            width={150}
            height={150}
          />
        </div>
        <div className={styles.ArticleCardDetails}>
          <h2><Link href={'/article/' + article.slug}>{article.title}</Link></h2>
          <p>{article.excerpt}</p>
          <p className={styles.ArticleCardDetailsLink}><Link href={'/article/' + article.slug}>Read More</Link></p>
        </div>
    </div>
  )
}

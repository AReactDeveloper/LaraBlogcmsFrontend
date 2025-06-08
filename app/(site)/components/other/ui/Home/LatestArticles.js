import React from 'react'
import ArticleList from '../ArticleList/ArticleList'

export default function LatestArticles({articles}) {
  return (
    <ArticleList
        Articles={articles.slice(0,4)}
        ArticlePerPage={10}
    />
  )
}

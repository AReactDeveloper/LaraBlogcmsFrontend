'use client';
import React, { useState } from 'react';
import ArticleCardList from '../ArticleCardList/ArticleCardList';
import styles from './ArticleList.module.scss';
import Skeleton from 'react-loading-skeleton';
import { IoGrid } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";

export default function ArticleList({Articles,ArticlePerPage , pageTitle,pageDescription,loading}) {

  const [isGrid,setIsGrid] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  if(!pageTitle){
    pageTitle = ''
  }

  if(!pageDescription){
    pageDescription = ''
  }

  //fallback in case articles dont load
  if(loading || !Articles){
    return (
      <div className={styles.ArticleList}>
        <div className={styles.ArticleListHead}>
        <div>
          <h2>{pageTitle}</h2>
          <p>{pageDescription}</p>
        </div>
        <div className={styles.actions}>
          <button onClick={()=>setIsGrid(true)}><IoGrid  size={24} /></button>
          <button onClick={()=>setIsGrid(false)}><CiBoxList size={24} /></button>
        </div>
      </div>
        <Skeleton height={150} style={{ marginBottom: '10px' }} />
        <Skeleton height={150} style={{ marginBottom: '10px' }} />
        <Skeleton height={150} style={{ marginBottom: '10px' }} />
        <Skeleton height={150} style={{ marginBottom: '10px' }} />
        <Skeleton height={150} style={{ marginBottom: '10px' }} />
      </div>
    );
  }

  const articlesPerPage = ArticlePerPage || 8;
  const totalArticles = Articles.length ;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);


  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = Articles.slice(startIndex, endIndex);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 smooth scroll to top
  };

  return (
    <>
   
    <div className={styles.ArticleList}>
      <div className={styles.ArticleListHead}>
        <div>
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
        </div>
        
        <div className={styles.ArticleListHeadActions}>
          <button onClick={()=>setIsGrid(true)}><IoGrid  size={24} /></button>
          <button onClick={()=>setIsGrid(false)}><CiBoxList size={24} /></button>
        </div>
      </div>
      <div className={isGrid ?  styles.ArticleGridContainer : styles.ArticleListContainer} >
        {currentArticles.map((article) => (
          <ArticleCardList isGrid={isGrid} key={article.id} article={article} />
        ))}
      </div>
    </div>
        
    {/*Only show pagination when needed*/}
    {Articles.length > ArticlePerPage ? (
      <div className={styles.Pagination}>
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            className={currentPage === page ? styles.active : ''}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
    ):('')}
  </>
  )
}

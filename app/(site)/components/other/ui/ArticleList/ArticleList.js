'use client';
import React, { useState } from 'react';
import ArticleCardList from '../ArticleCardList/ArticleCardList';

export default function ArticleList({Articles,ArticlePerPage}) {

  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="row">
    {currentArticles.map((article) => (
      <ArticleCardList key={article.id} article={article} />
    ))}
  </div>

        
    {/*Only show pagination when needed*/}
    {Articles.length > ArticlePerPage ? (
      <nav aria-label="Pagination">
      <hr className="my-0" />
      <ul className="pagination justify-content-center my-4">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <li key={page}
            className={currentPage === page ? 'page-item active' : 'page-item'}
            onClick={() => handlePageClick(page)}><a className="page-link" href="#" >
            {page}
          </a></li>
        );
      })}
      </ul>
      </nav>
    ):('')}
  </>
  )
}

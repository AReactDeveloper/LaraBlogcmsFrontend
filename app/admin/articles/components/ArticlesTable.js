"use client";

import Link from "next/link";
import postDeleteAction from "../(actions)/DeleteAction";
import { useState, useEffect } from "react";
import Spinner from "../../components/Utility/Spinner";

export default function ArticlesTable() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setArticles(data || []);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setError("Failed to load articles from server.");
    } finally {
      setLoading(false);
    }
  };
  // Fetch articles
  useEffect(() => {

    fetchArticles();
  }, []);

  // Clear messages after 4s
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Delete handler
  const handleArticleDelete = async (id) => {
    if (!confirm("Do you want to delete this article?")) return;
    setMessage("Deleting...");

    try {
      const response = await postDeleteAction(id);
      if (response) {
        // Remove deleted article from UI
        setArticles(prev => prev.filter(article => article.id !== id));
        setMessage("Article deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to delete article");
    }
  };

  if (loading) return <Spinner />;
  if (!articles.length) return <div className="error">No articles found.</div>;

  return (
    <>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>Author</th>
            <th>featured</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const createdAt = new Date(article.created_at);
            const yyyy = createdAt.getFullYear();
            const mm = String(createdAt.getMonth() + 1).padStart(2, "0");
            const dd = String(createdAt.getDate()).padStart(2, "0");
            const h = createdAt.getHours() % 12 || 12;
            const min = String(createdAt.getMinutes()).padStart(2, "0");
            const ampm = createdAt.getHours() >= 12 ? "PM" : "AM";

            return (
              <tr key={article.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <a href="#" className="post-title" onClick={e => e.preventDefault()}>
                    {article.title}
                  </a>
                  <div className="row-actions">
                    <span><Link href={'/admin/articles/edit/' + article?.slug} >Edit</Link></span>
                    <span><a href="#" onClick={e => e.preventDefault()}>Quick Edit</a></span>
                    <span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleArticleDelete(article.id);
                        }}
                      >
                        Trash
                      </a>
                    </span>
                    <span><Link target="__blank" href={`/article/${article.slug ?? "#"}`}>View</Link></span>
                  </div>
                </td>
                <td>admin</td>
                <td><img src={article.imgUrl || '/default.jpg'} width={120} /></td>
                <td><Link target="__blank" href={`/category/${article?.category?.title ?? "#"}`}>{article?.category?.title || "—"}</Link></td>
                <td>
                  {article?.tags?.length > 0 ? (
                    article.tags.map((tag, index) => (
                      <span key={tag.id || index}>
                        <Link target="_blank" href={`/tags/${tag.title ?? "#"}`}>
                          {tag.title || "—"}
                        </Link>
                        {index < article.tags.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  Published<br />
                  <small>{`${yyyy}/${mm}/${dd} at ${h}:${min} ${ampm}`}</small>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

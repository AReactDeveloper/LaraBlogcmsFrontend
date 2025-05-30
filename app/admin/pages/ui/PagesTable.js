"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Spinner from "../../components/Utility/Spinner";
import axiosInstance from "@/app/lib/axios";
import deletePage from "../Actions/deletePage";

export default function PagesTable() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/pages')
      const data = res.data;
      setPages(data || []);
    } catch (error) {
      console.error("Failed to fetch Pages:", error);
      setError("Failed to load pages from server.");
    } finally {
      setLoading(false);
    }
  };
  // Fetch articles
  useEffect(() => {

    fetchPages();
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

  const handleDeletePage = async(id)=>{
    setLoading(true)  
    const res = await deletePage(id)
      
      if(res.statusCode == 200){
        setMessage('page deleted successfully')
        setPages(prev => prev.filter(page => page.id !== id)) //delete from ui
      }
      if(res.statusCode == 500){
        setError('something went wrong while deleting your page')
      }
      setLoading(false)
  } 


  if (loading) return <Spinner />;
  if (!pages.length) {
    return (
      <table>
        <tbody>
          <tr>
            <td colSpan="100%">No Pages found.</td>
          </tr>
        </tbody>
      </table>
    );
  }
  
  return (
    <>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => {
            const createdAt = new Date(page.created_at);
            const yyyy = createdAt.getFullYear();
            const mm = String(createdAt.getMonth() + 1).padStart(2, "0");
            const dd = String(createdAt.getDate()).padStart(2, "0");
            const h = createdAt.getHours() % 12 || 12;
            const min = String(createdAt.getMinutes()).padStart(2, "0");
            const ampm = createdAt.getHours() >= 12 ? "PM" : "AM";

            return (
              <tr key={page.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <a href="#" className="post-title" onClick={e => e.preventDefault()}>
                    {page.title}
                  </a>
                  <div className="row-actions">
                    <span><Link href={'/admin/pages/edit/' + page?.slug} >Edit</Link></span>
                    <span>
                      <a onClick={()=>handleDeletePage(page.id)}>
                        Trash
                      </a>
                    </span>
                    <span><Link target="__blank" href={`/${page.slug ?? "#"}`}>View</Link></span>
                  </div>
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

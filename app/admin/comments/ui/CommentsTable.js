"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Spinner from "../../components/Utility/Spinner";
import axiosInstance from "@/app/lib/axios";
import { CiTrash } from "react-icons/ci";
import deleteComment from "../(Actions)/deleteCommentAction";

export default function CommentsTable() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/comment')
      const data = await res.data;
      setComments(data || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setError("Failed to load comments from server.");
    } finally {
      setLoading(false);
    }
  };
  // Fetch articles
  useEffect(() => {

    fetchComments();
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

  const handleCommentDelete =async(id)=>{
    if(confirm('are you sure')){
      try{
        const res = await deleteComment(id)
        if (res.statusCode === 200){
          setMessage(res.message);
          await fetchComments()
        }
        if (res.statusCode === 400){
          setError(res.message || "Failed to delete comment.");
        }
      }catch(e){
        setError('unexpected error , please try again later')
      }
    }
  }

  if (loading) return <Spinner />;
  if (!comments.length) return <div className="error">No comments found.</div>;

  return (
    <>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>by</th>
            <th>In response to</th>
            <th>Date</th>
            <th>Moderate</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => {
            const createdAt = new Date(comment.created_at);
            const yyyy = createdAt.getFullYear();
            const mm = String(createdAt.getMonth() + 1).padStart(2, "0");
            const dd = String(createdAt.getDate()).padStart(2, "0");
            const h = createdAt.getHours() % 12 || 12;
            const min = String(createdAt.getMinutes()).padStart(2, "0");
            const ampm = createdAt.getHours() >= 12 ? "PM" : "AM";

            return (
              <tr key={comment.id}>
                <td><input type="checkbox" /></td>
                <td>
                    {comment.body}
                </td>
                <td>
                    {comment?.author ||'user'}
                </td>
                <td>
                  <Link target="_blank" href={'/article/'+comment.article.slug}>{comment.article.title}</Link>
                </td>
                <td>
                  Published<br />
                  <small>{`${yyyy}/${mm}/${dd} at ${h}:${min} ${ampm}`}</small>
                </td>
                <td>
                  <button onClick={()=>handleCommentDelete(comment.id)} className="btnLink"><CiTrash size={24} /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

'use client';
import { postComment } from '@/app/lib/apiPosterHelper';
import React, { useEffect, useState } from 'react';
import styles from './commentList.module.scss';
import axiosInstance from '@/app/lib/axios';

export default function CommentList({ slug, articleId, comments }) {
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [fetchedComments, setFetchedComments] = useState(comments || []);
  const [loading, setLoading] = useState(false);

  const reFetchComments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/articles/' + slug + '/comments');
      setFetchedComments(response.data); // assuming API returns comment array directly
    } catch (err) {
      setError('');
    } finally {
      setLoading(false);
    }
  };


  //controllign how long a user can comment on the blog
  const COMMENT_THROTTLE_MS = 60 * 1000; // 1 minute

  const canPostComment = () => {
    const lastPosted = localStorage.getItem(`lastCommentTimestamp-${articleId}`);
    if (!lastPosted) return true;
    const elapsed = Date.now() - parseInt(lastPosted, 10);
    return elapsed > COMMENT_THROTTLE_MS;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!canPostComment()) {
      setError('for security reasons we are limiting how frequest you can comment please try again in 1 min.');
      return;
    }

    setValidationError(null);
    setError(null);
    setSuccess(null);

    if (!comment.trim()) {
      setValidationError('Comment body is required.');
      return;
    }

    if (author.trim() && author.length > 50) {
      setValidationError('Author name is too long.');
      return;
    }

    try {
      const commentData = { article_id: articleId, author, body: comment };
      await postComment(slug, commentData);
      //mark the user as just commented to throttle their activity
      localStorage.setItem(`lastCommentTimestamp-${articleId}`, Date.now().toString());
      setSuccess('Comment posted successfully!');
      setAuthor('');
      setComment('');
      setShowForm(false);
      // Refresh comments after posting
      const response = await axiosInstance.get('/api/articles/' + slug);
      setFetchedComments(response.data.comments);
    } catch (error) {
      setError('Error posting comment. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Add Comment</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="author">Name:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="comment">Leave a comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
          </div>
          <button type="submit">Comment</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      )}
      <div className={styles.commentBox}>
        <h3>Comments :</h3>
        {loading ? (
          <p>Loading comments...</p>
        ) : fetchedComments.length === 0 ? (
          <p>No comments, add one today!</p>
        ) : (
          fetchedComments.map((comment) => (
            <div key={comment.id} className={styles.commentBox}>
              <h4>{comment.author ?? ''}</h4>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

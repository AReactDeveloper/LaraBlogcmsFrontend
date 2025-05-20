'use client';
import { postComment } from '@/app/lib/apiPosterHelper';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios';
import CommentContainer from '../commentContainer/CommentContainer';

export default function CommentList({ slug, articleId, comments }) {
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [fetchedComments, setFetchedComments] = useState(comments || []);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Initial number of comments to show

  const COMMENT_THROTTLE_MS = 60 * 1000; // 1 minute

  const canPostComment = () => {
    if (typeof window === 'undefined') return false;
    const lastPosted = localStorage.getItem(`lastCommentTimestamp-${articleId}`);
    if (!lastPosted) return true;
    const elapsed = Date.now() - parseInt(lastPosted, 10);
    return elapsed > COMMENT_THROTTLE_MS;
  };

  const reFetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/articles/${slug}`);
      setFetchedComments(response.data.comments || []);
    } catch (err) {
      setFetchedComments([]);
      setError('Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reFetchComments();
  }, [slug]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!canPostComment()) {
      setError('For security reasons, you can only comment once per minute. Please try again later.');
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
      localStorage.setItem(`lastCommentTimestamp-${articleId}`, Date.now().toString());
      setSuccess('Comment posted successfully!');
      setAuthor('');
      setComment('');
      setShowForm(false);
      await reFetchComments();
      setVisibleCount(5); // Reset visible count after new comment
    } catch (error) {
      console.error(error);
      setError('Error posting comment. Please try again.');
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleComments = fetchedComments.slice(0, visibleCount);
  const hasMoreComments = fetchedComments.length > visibleCount;

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Comment'}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="author">Name:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={50}
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

      <CommentContainer loading={loading} fetchedComments={visibleComments} />

      {hasMoreComments && (
        <button onClick={handleLoadMore} style={{ marginTop: '1rem' }}>
          Load More Comments
        </button>
      )}
    </div>
  );
}

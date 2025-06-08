'use client';
import { postComment } from '@/app/lib/apiPosterHelper';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/lib/axios';

export default function CommentList({ slug, articleId, comments }) {
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
    setSuccess('')
    setError('')
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

  const hasMoreComments = fetchedComments.length < 0 || fetchedComments.length > visibleCount ;

  
return (
  <>
    {error && <p className="text-danger">{error}</p>}
    {success && <p className="text-success">{success}</p>}

    <div className="card bg-light">
      <div className="card-body">
        <form onSubmit={handleFormSubmit} className="mb-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Who are you?"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Join the discussion and leave a comment!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {validationError && <p className="text-danger">{validationError}</p>}

        {loading ? (
          <p>Loading comments...</p>
        ) : fetchedComments.length === 0 ? (
          <p>No comments, add one today!</p>
        ) : (
          fetchedComments.map((comment) => (
            <div key={comment.id} className="d-flex mb-3">
              <div className="flex-shrink-0">
                <img
                  className="rounded-circle"
                  src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                  alt="avatar"
                />
              </div>
              <div className="ms-3">
                <div className="fw-bold">{comment.author || "Anonymous"}</div>
                <div>{comment.body}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {hasMoreComments && (
      <button
        onClick={handleLoadMore}
        className="btn btn-secondary mt-3"
      >
        Load More Comments
      </button>
    )}
  </>
);
}

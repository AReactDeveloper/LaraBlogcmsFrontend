import React from 'react'

export default function CommentList() {
  return (
    <div>
        <form>
        <div>
            <label htmlFor="comment">Leave a comment : </label>
            <textarea id="comment"></textarea>
        </div>

        <button type="submit">comment</button>
        </form>
    </div>
  )
}

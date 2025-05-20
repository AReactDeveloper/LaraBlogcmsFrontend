'use client'
import styles from './commentcontainer.module.scss'

export default function CommentContainer({loading,fetchedComments}) {

    if(!fetchedComments){
        return(
            <div className='error-message'>failed to load comments</div>
        )
    }


  return (
    <div className={styles.commentContainer}>
        <h3>Comments :</h3>
        {loading ? (
            <p>Loading comments...</p>
        ) : fetchedComments.length === 0 ? (
            <p>No comments, add one today!</p>
        ) : (
            fetchedComments.map((comment) => (
            <div key={comment.id} className={styles.commentBox}>
                <h4>{comment.author || 'Anonymous'}</h4>
                <p>{comment.body}</p>
            </div>
            ))
        )}
    </div>
  )
}

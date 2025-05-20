'use client';
import styles from './singlePage.module.scss'

export default function SinglePage({
  title,
  content,
}) {

  return (
      <div className={styles.singlePage}>
        <div>
            <h1>{title}</h1>
        </div>
        <div className={styles.pageContent}>
            {content}
        </div>
      </div>
  );
}

'use client';
import { editorJsToHtml } from '@/app/utils/editorToHtml';
import styles from './singlePage.module.scss'

export default function SinglePage({
  title,
  content,
}) { 
  let html
  if(typeof content === 'object' && content.blocks){
    html = editorJsToHtml(content)
  }else{
    html = content
  }

  return (
      <div className={styles.singlePage}>
        <div>
            <h1>{title}</h1>
        </div>
        <div className={styles.pageContent}>
            <div dangerouslySetInnerHTML={{__html : html}}></div>
        </div>
      </div>
  );
}

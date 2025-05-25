'use client';

import { MdOutlineDateRange, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";

import styles from './singleArticle.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { editorJsToHtml } from "@/app/utils/editorToHtml";

export default function SingleArticle({
  title,
  created_at,
  category,
  tags,
  imgUrl,
  content,
  updated_at
}) {
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);
  const formatedDate = createdDate.toLocaleDateString('en-GB');
  const updateTime = updatedDate.toLocaleDateString('en-GB');

  let html = '';
  if (typeof content === 'string') {
    try {
      html = editorJsToHtml(content);
      console.log(html)
    } catch(e) {
      console.log(e)
      html = content; // fallback plain text
    }
  } else if (typeof content === 'object') {
    html = editorJsToHtml(content);
  } else {
    html = content || '';
  }

  
  return (
      <>
      <div className={styles.singlePostHead}>
        <h1>{title}</h1>
        <div className={styles.postMetaData}>
          <span>
            <MdOutlineDateRange />
            <span>{formatedDate}</span>
          </span>
          <span>
            <Link href={`/category/${category?.title}`}>
              <span><TbCategory2 />{category?.title}</span>
            </Link>
          </span>
          <span>
            <Link href="#">
              <span><FaUser />Admin</span>
            </Link>
          </span>
          <span>
            <MdOutlineSystemUpdateAlt />
            Last Update: {updateTime}
          </span>
        </div>
        <div className={styles.postTags}>
              {Array.isArray(tags) && tags.map(tag => (
        <Link key={tag.id} href={`/tags/${tag.title}`}>
          {tag.title}
        </Link>
))}
        </div>
      </div>
      <div className={styles.postImg}>
        <Image
          src={imgUrl || '/default.jpg'} 
          width={400}
          height={400}
          alt={title}
          priority
          placeholder="blur"
          blurDataURL="..."
        />
      </div>
      <div className={styles.postContent}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      </>
  );
}

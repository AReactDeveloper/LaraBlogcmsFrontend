'use client';

import { MdOutlineDateRange, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";

import styles from './singleArticle.module.scss';
import Image from "next/image";
import Link from 'next/link';
import { editorJsToHtml } from "@/app/utils/editorToHtml";
import { timeAgo } from "@/app/utils/timeAgo";

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
  const formatedDate = createdDate.toLocaleDateString('en-GB');
  const formatedUpdateDated = timeAgo(updated_at)

  const getImageFromArticle = (content) => {
    try {
      const parsed = JSON.parse(content);
      const imageBlock = parsed.blocks.find(block => block.type === 'image');
      if (imageBlock) {
        return imageBlock.data?.file?.url || '';
      }
    } catch (e) {
      console.log("Failed to extract image from content:", e);
    }
    return '';
  };
  const fallBackImgUrl = getImageFromArticle(content)
  const finalImgUrl = imgUrl || fallBackImgUrl

  
  let html = '';

  if (typeof content === 'string') {
    try {
      const parsed = typeof content === 'string' ? JSON.parse(content) : content;
      html = editorJsToHtml(content);
    } catch(e) {
      html = content; // fallback plain text
    }
  } else if (typeof content === 'object') {
    html = editorJsToHtml(JSON.stringify(content));
  } else {
    html = `<p>${content || ''}</p>`;
  }

  
  return (
      <div className={styles.singlePost}>
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
            Last Update: {formatedUpdateDated}
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
        {imgUrl ? (
          <Image
          src={finalImgUrl} 
          width={600}
          height={600}
          alt={title}
          priority
          placeholder="blur"
          blurDataURL="..."
        />
        ): ''}
      </div>
      <div className={styles.postContent}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      </div>
  );
}

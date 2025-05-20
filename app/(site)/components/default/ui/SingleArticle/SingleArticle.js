'use client';

import { MdOutlineDateRange, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";

import styles from './singleArticle.module.scss';
import Image from "next/image";
import Link from 'next/link';

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
            <Link href={`/category/${category.title}`}>
              <span><TbCategory2 />{category.title}</span>
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
          {tags.map(tag => (
            <Link key={tag.id} href={`/tags/${tag.title}`}>
              {tag.title}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.postImg}>
        <Image
          src={imgUrl}
          width={400}
          height={400}
          alt={title}
          priority
          placeholder="blur"
          blurDataURL="..."
        />
      </div>
      <div className={styles.postContent}>
        {content}
      </div>
      </>
  );
}

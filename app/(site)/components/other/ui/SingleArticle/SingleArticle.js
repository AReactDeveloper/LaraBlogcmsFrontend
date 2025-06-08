'use client';

import { TbCategory2 } from "react-icons/tb";

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
      <>
      <article>
        <header className="mb-4">
            <h1 className="fw-bolder mb-1">{title}</h1>
            <div className="text-muted fst-italic mb-2">{formatedDate}</div>
                <Link href={`/category/${category?.title}`}>
                  <span><TbCategory2 />{category?.title}</span>
                </Link>
                <br />
                tag:
                {Array.isArray(tags) && tags.map(tag => (
                  <Link key={tag.id} href={`/tags/${tag.title}`}>
                    {tag.title + ','} 
                  </Link>
                ))}
        </header>
        <figure className="mb-4">
          <Image
            src={imgUrl}
            width={400}
            height={400}
            alt={title}
          />
        </figure>
        <section className="mb-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    </article>
      </>
  );
}

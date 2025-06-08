'use client';
import { editorJsToHtml } from '@/app/utils/editorToHtml';

export default function SinglePage({
  title,
  content,
}) { 

  const html = editorJsToHtml(content)

  return (
      <>
      <article>
        <header className="mb-4">
            <h1 className="fw-bolder mb-1">{title}</h1>
        </header>
        <section className="mb-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    </article>
      </>
  );
}

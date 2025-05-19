import SingleArticle from "@/app/components/default/ui/SingleArticle/SingleArticle";
import { getArticleBySlug, getArticles } from "@/app/lib/apiHelper";
import { Suspense } from "react";
import styles from './singlePost.module.scss'
import CommentList from "@/app/components/default/ui/commentList/CommentList";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);

  return {
    title: `${data.title} | ${'blog article'} ` ,
    description: data.description || data.excerpt, // fallback to content
    openGraph: {
      title: data.title,
      description: data.description || data.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const data = await getArticles();
  const articles = data.data;
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function SinglePost({ params }) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);

  return (
    <>
      <div className={styles.singlePost}>
        <Suspense fallback={'loading...'}>
          <SingleArticle
            title={data.title}
            created_at={data.created_at}
            category={data.category}
            tags={data.tags}
            imgUrl={data.imgUrl}
            content={data.content}
          />
        </Suspense>
        <Suspense fallback={'loading...'}>
          <CommentList />
        </Suspense>
      </div>
    </>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds
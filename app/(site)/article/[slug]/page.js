'use server'
import SingleArticle from "@/app/(site)/components/default/ui/SingleArticle/SingleArticle";
import { getArticleBySlug, getArticles } from "@/app/lib/apiHelper";
import { Suspense } from "react";
import styles from './singlePost.module.scss'
import CommentList from "@/app/(site)/components/default/ui/commentList/CommentList";



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const {data , error} = await getArticleBySlug(slug);

  if (error || !data) {
    return {
      title: 'Article not found | blog article',
      description: 'No article found with this slug.',
      openGraph: {
        title: 'Article not found',
        description: 'No article found with this slug.',
      },
    };
  }

  return {
    title: `${data.title} | blog article`,
    description: data.description || data.excerpt,
    openGraph: {
      title: data.title,
      description: data.description || data.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const { data: articles } = await getArticles();
  if(articles){
    return articles.map((article) => ({ slug: article.slug }));
  }
}

export default async function SinglePost({ params }) {
  const { slug } = await params;
  const {data , error} = await getArticleBySlug(slug);

  console.log(data)

  if(error || !data){
    return(
      <div className="error-message">Faild to load article from server</div>
    )
  }
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
          <CommentList slug={data.slug} articleId={data.id} comments={data.comments || []} />
        </Suspense>
      </div>
    </>
  );
}


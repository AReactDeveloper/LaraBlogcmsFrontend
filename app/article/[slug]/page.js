
import SingleArticle from "@/app/components/default/ui/SingleArticle/SingleArticle";
import { getArticleBySlug } from "@/app/lib/apiHelper";
import { Suspense } from "react";
import styles from './singlePost.module.scss'
import CommentList from "@/app/components/default/ui/commentList/CommentList";

export const revalidate = 60;

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

export default async function SinglePost({params}) {

  const {slug} = await params;

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
  )
}

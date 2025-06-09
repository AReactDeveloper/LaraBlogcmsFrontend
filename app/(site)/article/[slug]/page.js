'use server'
import { getArticleBySlug, getArticles, getSiteInfo } from "@/app/lib/apiHelper";
import dynamic from "next/dynamic";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, error } = await getArticleBySlug(slug);

  if (error || !data) {
    return {
      title: 'Article not found | Blog', 
      description: 'No article found with this slug.',
      openGraph: {
        title: 'Article not found',
        description: 'No article found with this slug.',
        url: `https://lara-blogcms-frontend.vercel.app/${slug}`,
      },
      twitter: {
        card: 'summary',
        title: 'Article not found',
        description: 'No article found with this slug.',
      },
    };
  }

  if(!data.imgUrl){
    const getImageFromArticle = () => {
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
    const fallBackImgUrl = getImageFromArticle()
    const finalImgUrl = data.imgUrl || fallBackImgUrl
    return {
      title: `${data.title} | Blog`,
      description: data.description || data.excerpt || 'Read this article on our blog.',
      openGraph: {
        title: data.title,
        description: data.description || data.excerpt,
        url: `${process.env.NEXT_PUBLIC_FE_URL} / ${data.slug}`,
        images: finalImgUrl ? [
          {
            url: finalImgUrl,
            alt: data.title,
          },
        ] : undefined,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: data.description || data.excerpt,
        images: data.imgUrl ? [data.imgUrl] : undefined,
      },
    };
  }

  return {
    title: `${data.title} | Blog`,
    description: data.description || data.excerpt || 'Read this article on our blog.',
    openGraph: {
      title: data.title,
      description: data.description || data.excerpt,
      url: `https://lara-blogcms-frontend.vercel.app/${data.slug}`,
      images: data.imgUrl ? [
        {
          url: data.imgUrl,
          alt: data.title,
        },
      ] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description || data.excerpt,
      images: data.imgUrl ? [data.imgUrl] : undefined,
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

  const { data: siteInfo} = await getSiteInfo();

  const theme = siteInfo.siteTheme || 'default'

  const SingleArticle = dynamic(() => import(`@/app/(site)/components/${theme}/ui/SingleArticle/SingleArticle`)); 
  const CommentList = dynamic(() => import(`@/app/(site)/components/${theme}/ui/commentList/CommentList`)); 


  if(error || !data){
    return(
      <div className="error-message">Faild to load article from server</div>
    )
  }
  return (
    <>
          <SingleArticle
            title={data.title}
            created_at={data.created_at}
            updated_at={data.updated_at}
            category={data.category}
            tags={data.tags}
            imgUrl={data.imgUrl}
            content={data.content}
          />
          <CommentList slug={data.slug} articleId={data.id} comments={data.comments || []} />
    </>
  );
}


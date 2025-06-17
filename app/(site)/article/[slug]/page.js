'use server'
import { getArticleBySlug, getArticles, getSiteInfo } from "@/app/lib/apiHelper";
import dynamic from "next/dynamic";


export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data, error } = await getArticleBySlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_FE_URL || 'https://lara-blogcms-frontend.vercel.app';
  const canonicalUrl = `${siteUrl}/${slug}`;

  if (error || !data) {
    return {
      title: 'Article not found | Blog',
      description: 'No article found with this slug.',
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: 'Article not found',
        description: 'No article found with this slug.',
        url: canonicalUrl,
        siteName: 'Blog',
        type: 'article',
      },
      twitter: {
        card: 'summary',
        title: 'Article not found',
        description: 'No article found with this slug.',
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Fallback image extraction (if image not explicitly set)
  const getImageFromArticle = () => {
    try {
      const parsed = JSON.parse(data.content);
      const imageBlock = parsed.blocks.find(block => block.type === 'image');
      if (imageBlock) {
        return imageBlock.data?.file?.url || '';
      }
    } catch (e) {
      console.warn("Failed to extract image from content:", e);
    }
    return '';
  };

  const fallbackImgUrl = getImageFromArticle();
  const finalImgUrl = data.imgUrl || fallbackImgUrl || `${siteUrl}/default-og-image.jpg`;

  return {
    title: `${data.title} | Blog`,
    description: data.description || data.excerpt || 'Read this article on our blog.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description || data.excerpt || '',
      url: canonicalUrl,
      siteName: 'Blog',
      type: 'article',
      publishedTime: data.created_at,
      modifiedTime: data.updated_at,
      images: [
        {
          url: finalImgUrl,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description || data.excerpt || '',
      images: [finalImgUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: data.tags?.join(', ') || 'blog, articles, nextjs',
    authors: [{ name: data.author?.name || 'Admin' }],
    category: data.category || 'General',
    themeColor: '#ffffff', // optional: customize to match your brand
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

  const SingleArticle = dynamic(
  () => import(`@/app/(site)/components/${theme}/ui/SingleArticle/SingleArticle`),
  { ssr: true }
);
const CommentList = dynamic(
  () => import(`@/app/(site)/components/${theme}/ui/commentList/CommentList`),
  { ssr: true }
);


  if(error || !data){
    return(
      <div className="error-message">Faild to load article from server</div>
    )
  }
  return (
    <div>
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
    </div>
  );
}


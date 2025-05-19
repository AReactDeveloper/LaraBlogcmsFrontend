import { getArticles, getSiteInfo } from "@/app/lib/apiHelper";
import ArticleList from "../components/default/ui/ArticleList/ArticleList";
import { notFound } from "next/navigation";

let siteInfoCache;

async function getSiteInfoCached() {
  if (!siteInfoCache) {
    const { data, error } = await getSiteInfo();
    if (error) {
      siteInfoCache = { siteName: 'Your Site Name', siteDescription: 'Your site description' };
    } else {
      siteInfoCache = { siteName: data.siteName, siteDescription: data.siteDescription, articlesPerPage: data.articlesPerPage };
    }
  }
  return siteInfoCache;
}

export async function generateMetadata() {
  const siteInfo = await getSiteInfoCached();

  return {
    title: `Blog | ${siteInfo.siteName}`,
    description: siteInfo.siteDescription,
    openGraph: {
      title: `Blog | ${siteInfo.siteName}`,
      description: siteInfo.siteDescription,
      type: 'website',
    },
  };
}

export default async function Blog() {
  const { data: articles, error: articleError, loading: articleLoading } = await getArticles();

  if (articleError) {
    return notFound();
  }

  const siteInfo = await getSiteInfoCached();
  const articlePerPage = siteInfo?.articlesPerPage || 8;

  return (
    <main>
      <ArticleList
        ArticleLoading={articleLoading}
        ArticlePerPage={articlePerPage}
        Articles={articles || []}
        pageTitle={'Blog List : '}
        pageDescription={'Explore our latest articles here you can read them all '}
      />
    </main>
  );
}
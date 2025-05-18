import { getArticles, getSiteInfo } from "@/app/lib/apiHelper";
import ArticleList from "../components/default/ui/ArticleList/ArticleList";
import { notFound } from "next/navigation";

export const metadata = {
  title: 'Blog | Your Site Name',
  description: 'Explore our latest articles and updates on various topics.',
  openGraph: {
    title: 'Blog | Your Site Name',
    description: 'Explore our latest articles and updates on various topics.',
    type: 'website',
  },
};

export default async function Blog() {
  let Articles = []
  let ArticlePerPage = 8; //fallback in case siteinfo didnt load
  const {data : ArticleData ,error : ArticleError ,loading : ArticleLoading} = await getArticles()
  const {data  : SiteInfoData , error : siteInfoError , loading : siteInfoLoading} = await getSiteInfo()

  if(SiteInfoData){
    ArticlePerPage = SiteInfoData?.data?.sitePostsPerPage
  }

  if(ArticleData){
    Articles = ArticleData || []
  }

  if(ArticleError){
    return notFound()
  }

  return (
    <main>
      <ArticleList 
        ArticleLoading={ArticleLoading}
        ArticlePerPage={ArticlePerPage} 
        Articles={Articles} 
        pageTitle={'Blog List : '}
        pageDescription={'Explore our latest articles here you can read them all '}
      />
    </main>
  );
}

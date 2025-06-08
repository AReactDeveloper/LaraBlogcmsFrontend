import { getArticles, getSiteInfo } from "@/app/lib/apiHelper";

import dynamic from "next/dynamic";

const { data: siteInfo} = await getSiteInfo();

const theme = siteInfo.siteTheme


const ArticleList = dynamic(() => import(`../components/${theme}/ui/ArticleList/ArticleList`)); 

console.log(siteInfo.siteTheme)

export default async function Blog() {
  const { data: articles , loading : articleLoading} = await getArticles();
  const { data: siteInfo} = await getSiteInfo();

  const articlePerPage = siteInfo?.sitePostsPerPage;

  
  return (
    <main className="blog-wrapper">
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
import { getArticles, getSiteInfo } from "@/app/lib/apiHelper";
import ArticleList from "../components/default/ui/ArticleList/ArticleList";

export default async function Blog() {
  const { data: articles , loading : articleLoading} = await getArticles();
  const { data: siteInfo} = await getSiteInfo();


  const articlePerPage = siteInfo?.articlesPerPage || 8;

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
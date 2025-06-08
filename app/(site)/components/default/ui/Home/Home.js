import { getArticles } from "@/app/lib/apiHelper";
import LatestArticles from "./LatestArticles/LatestArticles";
import ArticleSlideshow from "./slider/ArticleSlideshow";

export default async function Home() {

  const {data} = await getArticles()

  return (
    <div>
      <ArticleSlideshow articles={data.slice(0,5)}/>
      <LatestArticles />
    </div>
  );
}
 
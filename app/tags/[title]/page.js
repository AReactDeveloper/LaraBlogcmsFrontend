import ArticleList from "@/app/components/default/ui/ArticleList/ArticleList";
import { getTagByTitle } from "@/app/lib/apiHelper";
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

export default async function SingleCategory({ params }) {
  const ArticlePerPage = 8;
  const { title } = await params;

  const { data, error , loading } = await getTagByTitle(title);

  if(data){
    console.log(data.articles)
  }

  if(error) {
    return 'errro'
  }


  return (
    <main>
      <ArticleList 
      Articles={data.articles}
      ArticlePerPage={ArticlePerPage}
      pageTitle={'Articles In ' + title}
      pageDescription={'here you can find all intressting articles in tag '+ title }
      />
    </main>
  );
}
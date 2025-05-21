import ArticleList from "../../components/default/ui/ArticleList/ArticleList";
import { getTagByTitle } from "@/app/lib/apiHelper";


export async function generateMetadata({ params }) {
  try {
    const { title } = await params;
    const { data } = await getTagByTitle(title);

    if (!data) {
      return {
        title: `${title} | Tag not found`,
        description: `No description available for Tag "${title}".`,
      };
    }

    return {
      title: `${data.title || title} | Articles in Tag ${data.title || title}`,
      description: data.description || `Articles in Tag : "${title}".`,
      openGraph: {
        title: data.title,
        description: data.description,
      },
    };
  } catch (e) {
    return {
      title: `Error | Tag metadata`,
      description: "An error occurred while generating metadata.",
    };
  }
}

export default async function SingleCategory({ params }) {
  const ArticlePerPage = 8;
  const { title } = await params;

  const { data  } = await getTagByTitle(title);

  if(!data) {
    return (
      <div className='error-message'>Category not found</div>
    )
  }


  return (
    <main>
      <ArticleList 
      Articles={data.articles}
      ArticlePerPage={ArticlePerPage}
      pageTitle={'Articles In ' + title}
      pageDescription={data.description}
      />
    </main>
  );
}
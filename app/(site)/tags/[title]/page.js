import ArticleList from "../../components/default/ui/ArticleList/ArticleList";
import { getTagByTitle } from "@/app/lib/apiHelper";


export async function generateMetadata({ params }) {
  try {
    const { title } = await params;
    const { data, error } = await getTagByTitle(title);

    if (error || !data) {
      return {
        title: `${title} | Tag not found`,
        description: `No description available for tag "${title}".`,
      };
    }

    return {
      title: `${data.title || title} | Articles in tag ${data.title || title}`,
      description: data.description || `Articles tagged with "${title}".`,
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

export default async function singleTag({ params }) {
  const ArticlePerPage = 8;
  const { title } = await params;

  const { data, error  } = await getTagByTitle(title);

  if(error || !data) {
    return (
      <div className='error-message'>Tag not found</div>
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
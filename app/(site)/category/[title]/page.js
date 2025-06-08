import { getCategoryByTitle, getSiteInfo } from "@/app/lib/apiHelper";
import dynamic from "next/dynamic";


const { data: siteInfo} = await getSiteInfo();

const theme = siteInfo.siteTheme || 'default'

const ArticleList = dynamic(() => import(`@/app/(site)/components/${theme}/ui/ArticleList/ArticleList`)); 


export async function generateMetadata({ params }) {
  try {
    const { title } = await params;
    const { data } = await getCategoryByTitle(title);

    if (!data) {
      return {
        title: `${title} | Category not found`,
        description: `No description available for Category "${title}".`,
      };
    }

    return {
      title: `${data.title || title} | Articles in Category ${data.title || title}`,
      description: data.description || `Articles in Category : "${title}".`,
      openGraph: {
        title: data.title,
        description: data.description,
      },
    };
  } catch (e) {
    return {
      title: `Error | Category metadata`,
      description: "An error occurred while generating metadata.",
    };
  }
}

export default async function SingleCategory({ params }) {
  const ArticlePerPage = 8;
  const { title } = await params;

  const { data  } = await getCategoryByTitle(title);

  if(!data) {
    return (
      <div className='error-message'>Category not found</div>
    )
  }


  return (
    <main>
      <h2>Articles in : {title}</h2>
      <br />
      <ArticleList 
      Articles={data.articles}
      ArticlePerPage={ArticlePerPage}
      pageTitle={'Articles In ' + title}
      pageDescription={data.description}
      />
    </main>
  );
}
import { getCategoryByTitle, getSiteInfo } from "@/app/lib/apiHelper";
import dynamic from "next/dynamic";


export async function generateMetadata({ params }) {
  try {
    const { title } = params;
    const { data } = await getCategoryByTitle(title);

    const siteUrl = process.env.NEXT_PUBLIC_FE_URL;
    const canonicalUrl = `${siteUrl}/category/${title}`;

    if (!data) {
      return {
        title: `${title} | Category not found`,
        description: `No description available for category "${title}".`,
        alternates: {
          canonical: canonicalUrl,
        },
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const keywords = [data.title, "category", "articles", "blog", "nextjs"]
      .filter(Boolean)
      .join(", ");

    return {
      title: `${data.title || title} | Articles in Category ${data.title || title}`,
      description: data.description || `Articles in category: "${title}".`,
      keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      metadataBase: new URL(siteUrl),
      openGraph: {
        title: `${data.title}`,
        description: data.description || `Articles in ${data.title}`,
        url: canonicalUrl,
        type: "website",
        siteName: "Your Blog",
      },
      twitter: {
        card: "summary",
        title: data.title,
        description: data.description || `Articles in ${data.title}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (e) {
    console.error("Metadata error:", e);
    return {
      title: `Error | Category metadata`,
      description: "An error occurred while generating metadata.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function SingleCategory({ params }) {

  const { data: siteInfo} = await getSiteInfo();
  const theme = siteInfo.siteTheme || 'default'
  const ArticleList = dynamic(() => import(`@/app/(site)/components/${theme}/ui/ArticleList/ArticleList`)); 


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
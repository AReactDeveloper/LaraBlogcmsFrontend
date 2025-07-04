import { getSiteInfo, getTagByTitle } from "@/app/lib/apiHelper";
import dynamic from "next/dynamic";

export async function generateMetadata({ params }) {
  try {
    const { title } = await params;
    const { data } = await getTagByTitle(title);

    const siteUrl = process.env.NEXT_PUBLIC_FE_URL;
    const canonicalUrl = `${siteUrl}/tags/${title}`;

    if (!data) {
      return {
        title: `${title} | Tag not found`,
        description: `No description available for tag "${title}".`,
        alternates: {
          canonical: canonicalUrl,
        },
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const keywords = [data.title, "tag", "articles", "blog", "nextjs"]
      .filter(Boolean)
      .join(", ");

    return {
      title: `${data.title || title} | Articles in Tag ${data.title || title}`,
      description: data.description || `Articles in Tag: "${title}".`,
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

  const { data  } = await getTagByTitle(title);
  console.log(data)

  if(!data) {
    return (
      <div className='error-message'>Category not found</div>
    )
  }


  return (
    <main>
      <h2>Articles in : {data?.title || title}</h2>
      <br />
      <ArticleList 
      Articles={data.articles}
      ArticlePerPage={ArticlePerPage}
      pageTitle={'Articles In ' + data?.title || title}
      pageDescription={data.description}
      />
    </main>
  );
}
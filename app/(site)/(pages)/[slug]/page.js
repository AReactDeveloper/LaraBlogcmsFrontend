import { getPageBySlug, getSiteInfo } from "@/app/lib/apiHelper";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const {data} = await getPageBySlug(slug);

  if(!data){
    return {
      title: `page title ` ,
      description: 'page description',
      openGraph:{
        title : 'page not found',
        description: 'no page found with slug'
      }
    };
  }

  return {
    title: `${data.title} | blog page` ,
    description: data.description,
    openGraph:{
      title : data.title,
      description: data.description
    }
  };
}

export default async function SinglePost({ params }) {
  const { slug } = await params;
  const {data} = await getPageBySlug(slug);

  const { data: siteInfo} = await getSiteInfo();
  const theme = siteInfo.siteTheme || 'default'
  const SinglePage = dynamic(() => import(`@/app/(site)/components/${theme}/ui/singlePage/SinglePage`)); 

  if(!data){
    return(
      <div className="error-message">Failed to load page from server</div>
    )
  }

  return (
    <>
        <Suspense fallback={'loading...'}>
          <SinglePage
            title={data.title}
            content={data.content}
          />
        </Suspense>
    </>
  );
}


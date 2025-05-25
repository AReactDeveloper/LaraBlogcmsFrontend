import { getPageBySlug, getPages } from "@/app/lib/apiHelper";
import { Suspense } from "react";
import SinglePage from "@/app/(site)/components/default/ui/singlePage/SinglePage";



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

export async function generateStaticParams() {
  const {data} = await getPages();
  const pages = data;
  return pages.map((page) => ({ slug: page.slug }));
}


export default async function SinglePost({ params }) {
  const { slug } = await params;
  const {data} = await getPageBySlug(slug);

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


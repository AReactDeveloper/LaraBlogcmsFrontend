import SinglePage from "@/app/(site)/components/default/ui/singlePage/SinglePage";
import { getPageBySlug, getPages } from "@/app/(site)/lib/apiHelper";
import { Suspense } from "react";



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPageBySlug(slug);

  return {
    title: `${data.title} | ${'blog article'} ` ,
    description: data.content, // fallback to content
    openGraph: {
      title: data.title,
      description: data.content,
    },
  };
}

export async function generateStaticParams() {
  const data = await getPages();
  const articles = data.data;
  return articles.map((page) => ({ slug: page.slug }));
}


export default async function SinglePost({ params }) {
  const { slug } = await params;
  const data = await getPageBySlug(slug);

  return (
    <>
        <Suspense fallback={'loading...'}>
          <SinglePage
            title={data.title}
            created_at={data.created_at}
            category={data.category}
            tags={data.tags}
            imgUrl={data.imgUrl}
            content={data.content}
          />
        </Suspense>
    </>
  );
}

export const revalidate = 100; // Revalidate every 60 seconds
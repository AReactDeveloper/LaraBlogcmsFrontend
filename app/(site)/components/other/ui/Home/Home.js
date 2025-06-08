import { getArticles } from "@/app/lib/apiHelper"
import Image from "next/image"
import Link from "next/link"
import LatestArticles from "./LatestArticles"

export default async function Home() {

  const {data} = await getArticles()

  console.log(data)

  return (
    <>
    {/** featured article */}
      <div className="card mb-4">
          <Link href={'/article/'+ data[0].slug}>
          <Image
          style={{height:'150px'}}
            className="card-img-top" 
            src={data[0].imgUrl} 
            width={1500} 
            alt={data[0].title}
            height={1500}/>
          </Link>
          <div className="card-body">
          <div className="small text-muted">
            {new Date(data[0].created_at).toLocaleString()}
          </div>
              <h2 className="card-title">{data[0].title}</h2>
              <p className="card-text">{data[0].excerpt}</p>
              <Link href={'/article/'+ data[0].slug} className="btn btn-primary" >Read more →</Link>
          </div>
      </div>
      {/** Home Page Article Loop */}
      <LatestArticles articles={data} />
    </>
  )
}

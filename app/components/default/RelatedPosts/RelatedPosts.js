import { getCategoryByTitle } from '@/app/lib/apiHelper'
import styles from './relatedPosts.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default async function RelatedPosts({category}) {

    const {data,error,loading} = await getCategoryByTitle(category)

    if(loading){
        return 'loading...'
    }

    if(data){
        console.log(data.articles)
    }

    if(error){
        console.log(error)
    }


  return (
    <>
    <h2>Related Articles :</h2>
    <div className={styles.relatedPosts}>
        {data.articles.slice(0,3).map((article,index)=>{
            return (<Link href={'/article/'+article.slug}><div key={article.id}>
                <Image 
                    src={article.imgUrl}
                    width={150}
                    height={150}
                    alt={article.title}
                />
                <h3>{article.title}</h3>
                </div></Link>)
        })}
    </div>
    </>
  )
}

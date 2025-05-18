import { MdOutlineDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

import styles from './singlePost.module.scss'

import Link from 'next/link'
import { getArticleBySlug } from "@/app/lib/apiHelper";
import Image from "next/image";

export const revalidate = 60;

export default async function SinglePost({params}) {

  const {slug} = await params;

  const data = await getArticleBySlug(slug)

  const newDate = new Date(data.created_at)
  const formatedDate = newDate.toLocaleDateString('en-GB')
  let updateTime = '9h ago';
  

  return (
    <div className={styles.singlePost}>
        <div className={styles.singlePostHead}>
          <h1>{data.title}</h1>
          <div className={styles.postMetaData}>
          <span>
            <MdOutlineDateRange />
            <span>{formatedDate}</span>
          </span>
          <span>
            <Link href={'/category/' + data.category.title}>
              <span><TbCategory2 />{data.category.title}</span>
            </Link>
          </span>
          <span>
            <Link href={'#'}>
              <span><FaUser />Admin</span>
            </Link>
          </span>
          <span>
              <MdOutlineSystemUpdateAlt />
              Last Update : {updateTime}
          </span>
          </div>
          <div className={styles.postTags}>
            {data.tags.map(tag=>{
              return <Link key={tag.id} href={'/tags/' + tag.title}>{tag.title}</Link>
            })}
          </div>
        </div>
        <div className={styles.postImg}>
            <Image
              src={data.imgUrl}
              width={400}
              height={400}
              alt={data.title}
              priority
              placeholder="blur" 
              blurDataURL="..."
            />
        </div>
        <div className={styles.postContent}>
          {data.content}
        </div>
        
        <div className='postComment'>
          post comments
        </div>
    </div>
  )
}

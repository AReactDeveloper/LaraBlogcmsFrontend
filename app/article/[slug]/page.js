import { MdOutlineDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

import styles from './singlePost.module.scss'

import Link from 'next/link'
import { getArticleBySlug } from "@/app/lib/apiHelper";
import Image from "next/image";
import RelatedPosts from "@/app/components/default/RelatedPosts/RelatedPosts";

export default async function SinglePost({params}) {

  const {slug} = await params;

  const {data,error,loading} = await getArticleBySlug(slug)

  if(loading){
    return 'loading...'
  }

  const newDate = new Date(data.created_at)
  const formatedDate = newDate.toLocaleDateString('en-GB')
  let updateTime = '';
  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    const [val, unit] = 
      diff < 60    ? [Math.floor(diff), 'sec'] :
      diff < 3600  ? [Math.floor(diff / 60), 'min'] :
      diff < 86400 ? [Math.floor(diff / 3600), 'hr'] :
                     [Math.floor(diff / 86400), 'day'];
    return `${val} ${unit}${val !== 1 ? 's' : ''} ago`;
  }
  
  updateTime = timeAgo(data.updated_at)

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
            />
        </div>
        <div className={styles.postContent}>
          {data.content}
        </div>
        <div className='postFooter'>
            <RelatedPosts category={data.category.title} />
        </div>
        <div className='postComment'>
          post comments
        </div>
    </div>
  )
}

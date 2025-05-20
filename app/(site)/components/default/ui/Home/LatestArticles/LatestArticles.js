import Link from 'next/link'
import ArticleList from '../../ArticleList/ArticleList'
import { getArticles } from '@/app/(site)/lib/apiHelper';

export default async function LatestArticles() {

    const { data: articles , loading : articleLoading} = await getArticles();
    
    return (
    <div>
        <ArticleList
            pageTitle={'Latest Articles'}
            pageDescription={'lorem'}
            loading={articleLoading}
            Articles={articles.slice(0,5)}
            showPagination={false}
        />
        <Link style={{
            marginBlock:'auto',fontSize:'2rem'
        }} href={'/blog'}>Go to Blog</Link>
    </div>
  )
}

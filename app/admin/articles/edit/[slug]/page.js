import { getArticleBySlug } from '@/app/lib/apiHelper'
import EditForm from './ui/EditForm'

export default async function page({params}) {
  const {slug} = await params
  
  return (
    <>
    <EditForm slug={slug} />
    </>
  )
}
